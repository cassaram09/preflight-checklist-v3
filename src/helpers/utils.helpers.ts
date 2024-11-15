import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const sleep = (delayMs: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
};

export const debounce = (delayMs: number, cb: (e: unknown) => void) => {
  let time = Date.now();

  return function debounced(e: unknown) {
    if (time + delayMs - Date.now() < 0) {
      cb(e);
      time = Date.now();
    }
  };
};

export const range = (count: number | string, start = 0): number[] =>
  [...Array(count).keys()].map((i) => i + start);

export const calculateWCA = (
  trueCourse: number,
  windDir: number,
  windKnots: number,
  trueAirspeed: number
): number => {
  const windDirectionRad = (windDir * Math.PI) / 180;

  const windX = windKnots * Math.sin(windDirectionRad);
  const windY = windKnots * Math.cos(windDirectionRad);

  const windCorrectionAngleRad = Math.atan2(windX, trueAirspeed - windY);
  const windCorrectionAngle = (windCorrectionAngleRad * 180) / Math.PI;

  return windCorrectionAngle;
};

export const calculateGroundspeed = (
  trueCourse: number,
  windDir: number,
  windKnots: number,
  trueAirSpeed: number
): number => {
  // Use WCA in degrees from the previous function
  // const wca = calculateWCA(trueCourse, windDir, windKnots, trueAirSpeed);

  const angleBetween = ((windDir - trueCourse) * Math.PI) / 180;

  // Apply the ground speed formula
  const groundSpeed = Math.sqrt(
    Math.pow(trueAirSpeed, 2) +
      Math.pow(windKnots, 2) -
      2 * trueAirSpeed * windKnots * Math.cos(angleBetween)
  );

  return groundSpeed;
};
export const calculateTime = (
  distanceNM: number,
  groundspeed: number
): number => {
  return (distanceNM / groundspeed) * 60; // Time in minutes
};

export const calculateLegDetails = (
  distanceNM: number,
  groundspeed: number,
  fuelBurnRatePerHour: number
) => {
  const timeHours = distanceNM / groundspeed; // Time in hours
  const fuelBurn = timeHours * fuelBurnRatePerHour; // Fuel in gallons
  return { legTime: timeHours * 60, fuelBurn }; // Time in minutes and fuel
};

// Function to calculate standard temperature at a given altitude
export const standardTemperatureAtAltitude = (altitudeFt: number) => {
  const seaLevelStandardTemp = 15; // 15°C at sea level
  const lapseRate = 2 / 1000; // 2°C decrease per 1000 feet
  return seaLevelStandardTemp - altitudeFt * lapseRate;
};

export const fToCDeg = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const ctoFDeg = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const decimalMinToHHMMSS = (decimalMinutes: number): string => {
  const totalSeconds = Math.floor(decimalMinutes * 60);
  const duration = dayjs.duration(totalSeconds, "seconds");

  return duration.format("HH:mm:ss");
};

export const linearInterpolate = (
  x: number,
  x0: number,
  x1: number,
  y0: number,
  y1: number
): number => {
  return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
};

export const haversineDistanceNM = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) => {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  const R = 3440.065; // Radius of the Earth in nautical miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in nautical miles

  return distance; // Return the distance in nautical miles
};

export const convertCAStoTAS = (
  cas: number,
  pressureAltitudeFt: number,
  tempC: number
): number => {
  // Constants
  const seaLevelPressureInHg = 29.92; // Standard sea level pressure in inches of mercury
  const standardLapseRateFeet = 1.0; // Lapse rate in feet per degree Celsius (approximately 1°C/1000ft)
  const seaLevelTempC = 15; // Standard sea level temperature in Celsius

  // Convert pressure altitude to temperature at altitude in Celsius
  const tempAtAltitudeC =
    seaLevelTempC - (pressureAltitudeFt * standardLapseRateFeet) / 1000;

  // Calculate pressure at altitude in inches of mercury using the barometric formula
  const pressureAtAltitudeInHg =
    seaLevelPressureInHg *
    Math.pow(
      (tempAtAltitudeC + 273.15) / (tempC + 273.15),
      9.80665 / (standardLapseRateFeet * 0.3048 * 287.05)
    );

  // Calculate True Airspeed (TAS)
  const tas = cas * Math.sqrt(seaLevelPressureInHg / pressureAtAltitudeInHg);

  return tas; // Return True Airspeed in knots
};

export const calculateNextLatLng = (
  lat: number,
  lng: number,
  distanceNM: number,
  trueCourse: number // Bearing in degrees
): { lat: number; lng: number } => {
  const earthRadiusNM = 3440.065; // Earth radius in nautical miles
  const distanceRadians = distanceNM / earthRadiusNM; // Convert distance to radians

  // Convert latitude and longitude from degrees to radians
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const bearingRad = (trueCourse * Math.PI) / 180; // Convert bearing to radians

  // Calculate the new latitude
  const newLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(distanceRadians) +
      Math.cos(latRad) * Math.sin(distanceRadians) * Math.cos(bearingRad)
  );

  // Calculate the new longitude
  const newLngRad =
    lngRad +
    Math.atan2(
      Math.sin(bearingRad) * Math.sin(distanceRadians) * Math.cos(latRad),
      Math.cos(distanceRadians) - Math.sin(latRad) * Math.sin(newLatRad)
    );

  // Convert the new latitude and longitude from radians back to degrees
  const newLat = (newLatRad * 180) / Math.PI;
  const newLng = (newLngRad * 180) / Math.PI;

  return { lat: newLat, lng: newLng };
};

export const toLegV2 = (
  from: Checkpoint,
  to: Checkpoint,
  type: "climb" | "cruise" | "descend",
  altitudeFt: number,
  distance: number,
  trueCourse: number,
  magneticeVariance: number,
  isStart = false
): LegV2 => {
  if (!to) {
    return {
      name: `${from.name}`,
      type,
      altitudeFt: { value: altitudeFt, unit: "FT" },
      distance: { value: 0, unit: "NM" },
      from,
      to: from,
      trueCourse: { value: trueCourse, unit: "DEG" },
      magneticVariance: { value: magneticeVariance, unit: "DEG" },
      isStart,
    };
  }
  return {
    name: `${from.name} to ${to.name}`,
    type,
    altitudeFt: { value: altitudeFt, unit: "FT" },
    distance: { value: distance, unit: "NM" },
    from,
    to,
    trueCourse: { value: trueCourse, unit: "DEG" },
    magneticVariance: { value: magneticeVariance, unit: "DEG" },
    isStart,
  };
};

export const getBaseUrl = () => {
  const vercel: number = Number(process.env.VERCEL);
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercel == 1) {
    if (vercel && vercelEnv == "production") {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }
    return `https://${process.env.VERCEL_URL}`;
  }

  return process.env.BASE_URL;
};
