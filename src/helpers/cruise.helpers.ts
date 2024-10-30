import {
  linearInterpolate,
  standardTemperatureAtAltitude,
} from "./utils.helpers";

// Sample data structure for cruise data chart
const cruiseChart = [
  {
    pressureAltitudeFt: 4000,
    rpmData: [
      {
        rpm: 2100,
        temps: {
          "20Cbelow": { BHP: 48, KTAS: 94, GPH: 5.6 },
          standard: { BHP: 46, KTAS: 93, GPH: 5.5 },
          "20Cabove": { BHP: 44, KTAS: 92, GPH: 5.3 },
        },
      },

      {
        rpm: 2500,
        temps: {
          "20Cbelow": { BHP: 76, KTAS: 116, GPH: 8.5 },
          standard: { BHP: 71, KTAS: 115, GPH: 8 },
          "20Cabove": { BHP: 67, KTAS: 115, GPH: 7.5 },
        },
      },
    ],
  },

  {
    pressureAltitudeFt: 12000,
    rpmData: [
      {
        rpm: 2200,
        temps: {
          "20Cbelow": { BHP: 46, KTAS: 96, GPH: 5.5 },
          standard: { BHP: 44, KTAS: 95, GPH: 5.4 },
          "20Cabove": { BHP: 43, KTAS: 94, GPH: 5.3 },
        },
      },
      {
        rpm: 2600,
        temps: {
          "20Cbelow": { BHP: 68, KTAS: 119, GPH: 7.7 },
          standard: { BHP: 64, KTAS: 118, GPH: 7.2 },
          "20Cabove": { BHP: 61, KTAS: 117, GPH: 6.8 },
        },
      },
    ],
  },
];

export const interpolateCruiseData = (
  pressureAltitude: number,
  rpm: number,
  actualTempC: number
) => {
  // Step 1: Find closest altitude rows
  const [lowerAltitude, upperAltitude] = findClosestAltitudes(
    cruiseChart,
    pressureAltitude
  );

  // Step 2: Interpolate at each altitude level for given RPM and temperature
  const lowerAltitudeData = interpolateAtAltitude(
    lowerAltitude,
    rpm,
    pressureAltitude,
    actualTempC
  );
  const upperAltitudeData = interpolateAtAltitude(
    upperAltitude,
    rpm,
    pressureAltitude,
    actualTempC
  );

  // Step 3: Interpolate between the two altitudes
  return {
    BHP: linearInterpolate(
      pressureAltitude,
      lowerAltitude.pressureAltitudeFt,
      upperAltitude.pressureAltitudeFt,
      lowerAltitudeData.BHP,
      upperAltitudeData.BHP
    ),
    KTAS: linearInterpolate(
      pressureAltitude,
      lowerAltitude.pressureAltitudeFt,
      upperAltitude.pressureAltitudeFt,
      lowerAltitudeData.KTAS,
      upperAltitudeData.KTAS
    ),
    GPH: linearInterpolate(
      pressureAltitude,
      lowerAltitude.pressureAltitudeFt,
      upperAltitude.pressureAltitudeFt,
      lowerAltitudeData.GPH,
      upperAltitudeData.GPH
    ),
  };
};

// Helper to find closest altitude data entries
interface TempData {
  BHP: number;
  KTAS: number;
  GPH: number;
}

interface RPMData {
  rpm: number;
  temps: {
    "20Cbelow": TempData;
    standard: TempData;
    "20Cabove": TempData;
  };
}

interface AltitudeData {
  pressureAltitudeFt: number;
  rpmData: RPMData[];
}

function findClosestAltitudes(
  chart: AltitudeData[],
  pressureAltitude: number
): [AltitudeData, AltitudeData] {
  let lower: AltitudeData | undefined, upper: AltitudeData | undefined;
  for (let i = 0; i < chart.length - 1; i++) {
    if (
      chart[i].pressureAltitudeFt <= pressureAltitude &&
      chart[i + 1].pressureAltitudeFt >= pressureAltitude
    ) {
      lower = chart[i];
      upper = chart[i + 1];
      break;
    }
  }
  return [lower!, upper!];
}

// Helper to interpolate at a specific altitude for RPM and temperature
function interpolateAtAltitude(
  altitudeData: AltitudeData,
  rpm: number,
  pressureAltitude: number,
  actualTemp: number
) {
  // Step 1: Find closest RPM entries
  const [lowerRPMData, upperRPMData] = findClosestRPMs(
    altitudeData.rpmData,
    rpm
  );

  // Step 2: Interpolate between RPMs at each temperature level (20C below, standard, 20C above)
  const standardTemp = standardTemperatureAtAltitude(pressureAltitude);
  const tempLevel = determineTempLevel(actualTemp, standardTemp);

  const interpolatedLowerRPM = lowerRPMData.temps[tempLevel];
  const interpolatedUpperRPM = upperRPMData.temps[tempLevel];

  return {
    BHP: linearInterpolate(
      rpm,
      lowerRPMData.rpm,
      upperRPMData.rpm,
      interpolatedLowerRPM.BHP,
      interpolatedUpperRPM.BHP
    ),
    KTAS: linearInterpolate(
      rpm,
      lowerRPMData.rpm,
      upperRPMData.rpm,
      interpolatedLowerRPM.KTAS,
      interpolatedUpperRPM.KTAS
    ),
    GPH: linearInterpolate(
      rpm,
      lowerRPMData.rpm,
      upperRPMData.rpm,
      interpolatedLowerRPM.GPH,
      interpolatedUpperRPM.GPH
    ),
  };
}

// Helper to find closest RPM data entries
function findClosestRPMs(rpmData: RPMData[], rpm: number): RPMData[] {
  let lower, upper;
  for (let i = 0; i < rpmData.length - 1; i++) {
    if (rpmData[i].rpm <= rpm && rpmData[i + 1].rpm >= rpm) {
      lower = rpmData[i];
      upper = rpmData[i + 1];
      break;
    }
  }
  return [lower as RPMData, upper as RPMData];
}

// Helper to determine temperature level for interpolation
function determineTempLevel(actualTemp: number, standardTemp: number) {
  if (actualTemp <= standardTemp - 20) return "20Cbelow";
  if (actualTemp >= standardTemp + 20) return "20Cabove";
  return "standard";
}
