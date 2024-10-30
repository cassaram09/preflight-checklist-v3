import { standardTemperatureAtAltitude } from "./utils.helpers";

export const interpolateClimbDataWithTemp = (
  startAltitude: number,
  endAltitude: number,
  startTempC: number,
  node1: ClimbNodeData,
  node2: ClimbNodeData
) => {
  const { pressureAltitudeFt: h1, fromSeaLevel: values1 } = node1;
  const { pressureAltitudeFt: h2, fromSeaLevel: values2 } = node2;

  const interpolateSegment = (x1: number, x2: number) => {
    const fullClimbValue = x1 + ((x2 - x1) * (endAltitude - h1)) / (h2 - h1);
    const startClimbValue = x1 + ((x2 - x1) * (startAltitude - h1)) / (h2 - h1);
    return fullClimbValue - startClimbValue;
  };

  let timeMin = interpolateSegment(values1.timeMin, values2.timeMin);
  let fuelUsed = interpolateSegment(values1.fuelUsed, values2.fuelUsed);
  let distanceNM = interpolateSegment(values1.distanceNM, values2.distanceNM);

  const standardTempStart = standardTemperatureAtAltitude(startAltitude);

  timeMin = applyTemperatureAdjustment(timeMin, startTempC, standardTempStart);
  fuelUsed = applyTemperatureAdjustment(
    fuelUsed,
    startTempC,
    standardTempStart
  );
  distanceNM = applyTemperatureAdjustment(
    distanceNM,
    startTempC,
    standardTempStart
  );

  const climbSpeedKias = (node1.climbSpeedKIAS + node2.climbSpeedKIAS) / 2;

  return { timeMin, fuelUsed, distanceNM, KIAS: climbSpeedKias };
};

export const applyTemperatureAdjustment = (
  value: number,
  actualTemp: number,
  standardTemp: number
) => {
  const tempDifference = actualTemp - standardTemp;
  const adjustmentFactor = 1 + (tempDifference / 10) * 0.1; // 10% per 10°C difference
  return value * adjustmentFactor;
};

// allowance for start, takeoff, and takeoff
export const applyStartAllowance = (value: number) => {
  const fuelAllowance = 1.1;
  return value + fuelAllowance;
};

export const climbNode0: ClimbNodeData = {
  pressureAltitudeFt: 0,
  standardTempC: 15,
  climbSpeedKIAS: 73,
  rateofClimbFPM: 770,
  fromSeaLevel: {
    timeMin: 0,
    fuelUsed: 0,
    distanceNM: 0,
  },
};

export const climbNode1000: ClimbNodeData = {
  pressureAltitudeFt: 1000,
  standardTempC: 13,
  climbSpeedKIAS: 73,
  rateofClimbFPM: 725,
  fromSeaLevel: {
    timeMin: 1,
    fuelUsed: 0.3,
    distanceNM: 2,
  },
};

export const climbNode5000: ClimbNodeData = {
  pressureAltitudeFt: 5000,
  standardTempC: 5,
  climbSpeedKIAS: 71,
  rateofClimbFPM: 535,
  fromSeaLevel: {
    timeMin: 8,
    fuelUsed: 1.5,
    distanceNM: 10,
  },
};

export const climbNode10000: ClimbNodeData = {
  pressureAltitudeFt: 10000,
  standardTempC: -5,
  climbSpeedKIAS: 68,
  rateofClimbFPM: 295,
  fromSeaLevel: {
    timeMin: 21,
    fuelUsed: 3.7,
    distanceNM: 27,
  },
};

export const climbNode12000: ClimbNodeData = {
  pressureAltitudeFt: 12000,
  standardTempC: -9,
  climbSpeedKIAS: 67,
  rateofClimbFPM: 200,
  fromSeaLevel: {
    timeMin: 29,
    fuelUsed: 4.9,
    distanceNM: 38,
  },
};
