"use client";

import { classes } from "@/helpers/styles.helpers";
import styles from "./NavLogTable.module.scss";
import {
  calculateGroundspeed,
  calculateTime,
  calculateWCA,
  convertCAStoTAS,
  decimalMinToHHMMSS,
  toLegV2,
} from "@/helpers/utils.helpers";
import { Text } from "@/primitives";
import {
  applyStartAllowance,
  climbNode10000,
  climbNode5000,
  interpolateClimbDataWithTemp,
} from "@/helpers/rateOfClimb.helpers";
import { interpolateCruiseData } from "@/helpers/cruise.helpers";
import { useState } from "react";

export type NavLogTableProps = {
  legs: LegParams[];
  checkpoints: Checkpoint[];
};

export default function NavLogTable({
  legs,
  checkpoints,
}: NavLogTableProps): JSX.Element {
  const cl = classes(styles);

  function createLegs(_legs: LegParams[], _checkpoints: Checkpoint[]): LegV2[] {
    return legs.map((leg) => {
      return toLegV2(
        _checkpoints[leg[0]],
        _checkpoints[leg[1]],
        leg[2],
        leg[3],
        leg[4],
        leg[5],
        leg[6],
        leg[7]
      );
    });
  }

  const [segments] = useState<Segment[]>(
    convertToSegments(createLegs(legs, checkpoints))
  );

  // const [stateCheckpoints, setStateCheckpoints] =
  //   useState<Checkpoint[]>(checkpoints);

  // const onWindVelChange = (value: number, index: number) => {
  //   const newStateCheckpoints = structuredClone(stateCheckpoints);
  //   newStateCheckpoints[index].windVel.value = Number(value || 0);
  //   setStateCheckpoints(newStateCheckpoints);
  //   setStateLegs(createLegs(legs, newStateCheckpoints));
  // };

  // const onWindDirChange = (value: number, index: number) => {
  //   const newStateCheckpoints = structuredClone(stateCheckpoints);
  //   newStateCheckpoints[index].windDir.value = Number(value || 0);
  //   setStateCheckpoints(newStateCheckpoints);
  //   setStateLegs(createLegs(legs, newStateCheckpoints));
  // };

  // const segments = convertToSegments(stateLegs);

  // const renderCheckpoints = () => (
  //   <div className={cl("checkpoints")}>
  //     {stateCheckpoints.map((checkpoint, index) => {
  //       return (
  //         <div key={index} className={cl("checkpoint")}>
  //           <Text component="p" variant="body3" text={checkpoint.name} />
  //           <Text
  //             component="p" variant="body3"
  //             text={`Alt: ${checkpoint.altitudeFt.value} FT`}
  //           />
  //           <Text component="p" variant="body3" text={`Temp: ${checkpoint.temp.value} C`} />
  //           <div>
  //             <Text component="p" variant="body3" text={`WDDEG`} />
  //             <input
  //               type="number"
  //               value={checkpoint.windDir.value}
  //               onChange={(e: any) => onWindDirChange(e.target.value, index)}
  //             />
  //           </div>

  //           <div>
  //             <Text component="p" variant="body3" text={`WV: KTS`} />
  //             <input
  //               value={checkpoint.windVel.value}
  //               type="number"
  //               onChange={(e: any) => onWindVelChange(e.target.value, index)}
  //             />
  //           </div>
  //           <Text
  //             component="p" variant="body3"
  //             text={`MV: ${checkpoint.magneticVariance.value} DEG`}
  //           />
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  const renderTotals = () =>
    segments.length && (
      <div className={cl("totals")}>
        <Text
          component="p"
          variant="body3"
          text={`Total Distance: ${getTotals(segments).totalDistance.toFixed(
            2
          )} NM`}
        />
        <Text
          component="p"
          variant="body3"
          text={`Total Fuel Burn: ${getTotals(segments).totalFuelBurn.toFixed(
            2
          )} GAL`}
        />
        <Text
          component="p"
          variant="body3"
          text={`Total Time: ${decimalMinToHHMMSS(
            getTotals(segments).totalTime
          )}`}
        />
      </div>
    );

  const renderSegments = () =>
    segments.length &&
    segments.map((segment, index) => (
      <div key={index} className={cl("segment")}>
        <div className={cl("cell")}>
          <Text component="p" variant="body4" text={segment.name} />
        </div>
        <div className={cl("cell")}>
          <Text component="p" variant="body3" text={segment.altitude.value} />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.trueCourse.value.toFixed(0)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.windCorrectionAngle.value.toFixed(0)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.trueHeading.value.toFixed(0)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.magneticVariance.value.toFixed(0)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.magneticHeading.value.toFixed(0)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.distance.value.toFixed(2)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.trueAirSpeed.value.toFixed(0)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.fuelBurn.value.toFixed(2)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.fuelBurnRate.value.toFixed(2)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${decimalMinToHHMMSS(segment.time.value)}`}
          />
        </div>
        <div className={cl("cell")}>
          <Text
            component="p"
            variant="body3"
            text={`${segment.groundspeed.value.toFixed(0)}`}
          />
        </div>
      </div>
    ));

  const renderHeaders = () => (
    <div className={cl("segment")}>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"Name"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"Alt"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"TC"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"WCA"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"TH"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"MV"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"MH"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"Dist"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"TAS"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"Fuel"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"GPH"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"Time"} />
      </div>
      <div className={cl("cell")}>
        <Text component="p" variant="body3" weight="bold" text={"GS"} />
      </div>
    </div>
  );

  return (
    <div className={cl("root")}>
      <Text
        component="h2"
        variant="body1"
        text="Navlog"
        className={cl("title")}
      />
      {renderTotals()}
      {/* {renderCheckpoints()} */}
      <div className={cl("content")}>
        {renderHeaders()}
        {renderSegments()}
      </div>
    </div>
  );
}

function convertToSegments(legs: LegV2[]): Segment[] {
  const segments: Segment[] = [];

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
  if (leg.type === "climb") {
    return getClimbData(leg);
  }

  return getCruiseData(leg, index, segments);
}

function getCruiseData(leg: LegV2, index: number, segments: Segment[]) {
  const cruiseData = interpolateCruiseData(
    leg.from.altitudeFt.value,
    2500,
    leg.from.temp.value
  );

  const trueAirSpeed: CheckpointValue = { value: cruiseData.KTAS, unit: "KTS" };

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

  const groundspeed: CheckpointValue = {
    value: calculateGroundspeed(
      leg.trueCourse.value,
      leg.from.windDir.value,
      leg.from.windVel.value,
      trueAirSpeed.value
    ),
    unit: "KTS",
  };

  const distance: CheckpointValue = {
    value:
      segments[index - 1]?.type == "climb"
        ? leg.distance.value - segments[index - 1].distance.value
        : leg.distance.value,
    unit: "NM",
  };

  const time: CheckpointValue = {
    value: calculateTime(distance.value, groundspeed.value),
    unit: "MIN",
  };

  const fuelBurn: CheckpointValue = {
    value: cruiseData.GPH * (time.value / 60),
    unit: "GAL",
  };

  const fuelBurnRate: CheckpointValue = { value: cruiseData.GPH, unit: "GPH" };

  const altitude: CheckpointValue = {
    value: leg.from.altitudeFt.value,
    unit: "FT",
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
    fuelBurnRate,
    altitude,
  };
}

function getClimbData(leg: LegV2) {
  const climbData = interpolateClimbDataWithTemp(
    leg.from.altitudeFt.value,
    leg.to.altitudeFt.value,
    leg.to.temp.value,
    climbNode5000,
    climbNode10000
  );

  const trueAirSpeed: CheckpointValue = {
    value: convertCAStoTAS(
      climbData.KIAS,
      leg.from.altitudeFt.value,
      leg.from.temp.value
    ),
    unit: "KTS",
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

  const groundspeed: CheckpointValue = {
    value: calculateGroundspeed(
      leg.trueCourse.value,
      leg.from.windDir.value,
      leg.from.windVel.value,
      trueAirSpeed.value
    ),
    unit: "KTS",
  };

  const distance: CheckpointValue = {
    value: climbData.distanceNM,
    unit: "NM",
  };

  const time: CheckpointValue = {
    value: calculateTime(distance.value, groundspeed.value),
    unit: "MIN",
  };

  let fuelBurnVal = climbData.fuelUsed;

  if (leg.isStart) {
    fuelBurnVal = applyStartAllowance(fuelBurnVal);
  }

  const fuelBurn: CheckpointValue = {
    value: fuelBurnVal,
    unit: "GAL",
  };

  const fuelBurnRate: CheckpointValue = { value: 0, unit: "GPH" };

  const altitude: CheckpointValue = {
    value: leg.from.altitudeFt.value,
    unit: "FT",
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
    fuelBurnRate,
    altitude,
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
