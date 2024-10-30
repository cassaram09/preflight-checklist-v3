import { classes } from "@/helpers/styles.helpers";
import styles from "./NavlogContainer.module.scss";
import {
  calculateGroundspeed,
  calculateTime,
  calculateWCA,
  convertCAStoTAS,
  decimalMinToHHMMSS,
} from "@/helpers/utils.helpers";
import { Text } from "@/primitives";
import {
  applyStartAllowance,
  climbNode10000,
  climbNode5000,
  interpolateClimbDataWithTemp,
} from "@/helpers/rateOfClimb.helpers";
import { interpolateCruiseData } from "@/helpers/cruise.helpers";

type NavlogContainerProps = {
  legs: LegV2[];
};

export default function NavlogContainer({
  legs,
}: NavlogContainerProps): JSX.Element {
  const cl = classes(styles);

  const segments = convertToSegments(legs);

  return (
    <div className={cl("root")}>
      <div>
        <Text component="h2" variant="h1" text="Navlog" />
        <Text
          component="p"
          text={`Total Distance: ${getTotals(segments).totalDistance.toFixed(
            2
          )} NM`}
        />
        <Text
          component="p"
          text={`Total Fuel Burn: ${getTotals(segments).totalFuelBurn.toFixed(
            2
          )} GAL`}
        />
        <Text
          component="p"
          text={`Total Time: ${decimalMinToHHMMSS(
            getTotals(segments).totalTime
          )}`}
        />
      </div>
      {segments.map((segment, index) => (
        <div key={index} className={cl("segment")}>
          <Text component="p" variant="h3" text={segment.name} />
          <Text
            component="p"
            text={`trueCourse: ${segment.trueCourse.value.toFixed(0)}`}
          />
          <Text
            component="p"
            text={`windCorrectionAngle: ${segment.windCorrectionAngle.value.toFixed(
              0
            )}`}
          />
          <Text
            component="p"
            text={`trueHeading: ${segment.trueHeading.value.toFixed(0)}`}
          />
          <Text
            component="p"
            text={`magneticVariance: ${segment.magneticVariance.value.toFixed(
              0
            )}`}
          />
          <Text
            component="p"
            text={`magneticHeading: ${segment.magneticHeading.value.toFixed(
              0
            )}`}
          />
          <Text
            component="p"
            text={`distance: ${segment.distance.value.toFixed(2)}`}
          />
          <Text
            component="p"
            text={`trueAirSpeed: ${segment.trueAirSpeed.value.toFixed(0)}`}
          />
          <Text
            component="p"
            text={`fuelBurn: ${segment.fuelBurn.value.toFixed(2)}`}
          />
          <Text
            component="p"
            text={`time: ${decimalMinToHHMMSS(segment.time.value)}`}
          />
          <Text
            component="p"
            text={`groundspeed: ${segment.groundspeed.value.toFixed(0)}`}
          />
        </div>
      ))}
    </div>
  );
}

function convertToSegments(legs: LegV2[]): Segment[] {
  let segments: Segment[] = [];

  for (let i = 0; i < legs.length; i++) {
    const segment = convertToSegment(legs[i], i, segments);
    segments.push(segment);
  }

  return segments;
}

function convertToSegment(
  leg: LegV2,
  index: number,
  segments: Segment[]
): Segment {
  let fuelBurn: CheckpointValue = { value: 0, unit: "GAL" };
  let trueAirSpeed: CheckpointValue = { value: 0, unit: "KTS" };
  let distance: CheckpointValue = { value: leg.distance.value, unit: "NM" };

  if (leg.type === "cruise") {
    const cruiseData = interpolateCruiseData(
      leg.from.altitudeFt.value,
      2500,
      leg.from.temp.value
    );
    trueAirSpeed = { value: cruiseData.KTAS, unit: "KTS" };

    let fuelBurnVal =
      cruiseData.GPH * (leg.distance.value / trueAirSpeed.value);

    fuelBurn = {
      value: fuelBurnVal,
      unit: "GAL",
    };

    distance = {
      value:
        segments[index - 1]?.type == "climb"
          ? leg.distance.value - segments[index - 1].distance.value
          : leg.distance.value,
      unit: "NM",
    };
  }

  if (leg.type === "climb") {
    const climbData = interpolateClimbDataWithTemp(
      leg.from.altitudeFt.value,
      leg.to.altitudeFt.value,
      leg.to.temp.value,
      climbNode5000,
      climbNode10000
    );

    trueAirSpeed = {
      value: convertCAStoTAS(
        climbData.KIAS,
        leg.from.altitudeFt.value,
        leg.from.temp.value
      ),
      unit: "KTS",
    };

    let fuelBurnVal = climbData.fuelUsed;

    if (leg.isStart) {
      fuelBurnVal = applyStartAllowance(fuelBurnVal);
    }

    fuelBurn = { value: fuelBurnVal, unit: "GAL" };
    distance = {
      value: climbData.distanceNM,
      unit: "NM",
    };
  }

  const groundspeed: CheckpointValue = {
    value: calculateGroundspeed(
      leg.trueCourse.value,
      leg.from.windDir.value,
      leg.from.windVel.value,
      trueAirSpeed.value
    ),
    unit: "KTS",
  };

  const time: CheckpointValue = {
    value: calculateTime(distance.value, groundspeed.value),
    unit: "MIN",
  };

  const windCorrectionAngle: CheckpointValue = {
    value: calculateWCA(
      leg.trueCourse.value,
      leg.from.windDir.value,
      leg.from.windVel.value,
      trueAirSpeed.value
    ),
    unit: "DEG",
  };

  const trueHeading: CheckpointValue = {
    value: leg.trueCourse.value + windCorrectionAngle.value,
    unit: "DEG",
  };

  const magneticHeading: CheckpointValue = {
    value:
      leg.trueCourse.value +
      windCorrectionAngle.value +
      leg.magneticVariance.value,
    unit: "DEG",
  };

  return {
    name: leg.name,
    from: leg.from,
    to: leg.to,
    type: leg.type,
    time,
    fuelBurn,
    groundspeed,
    trueCourse: leg.trueCourse,
    windCorrectionAngle,
    trueHeading,
    magneticVariance: leg.magneticVariance,
    magneticHeading,
    distance,
    trueAirSpeed,
  };
}

function getTotals(segments: Segment[]): Totals {
  const totalDistance = segments.reduce(
    (acc, segment) => acc + segment.distance.value,
    0
  );

  const totalFuelBurn = segments.reduce(
    (acc, segment) => acc + segment.fuelBurn.value,
    0
  );

  const totalTime = segments.reduce(
    (acc, segment) => acc + segment.time.value,
    0
  );

  return {
    totalDistance,
    totalFuelBurn,
    totalTime,
  };
}

type Totals = {
  totalDistance: number;
  totalFuelBurn: number;
  totalTime: number;
};
