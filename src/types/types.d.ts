type Checkpoint = {
  name: string;
  // location: {
  //   lat: number;
  //   lng: number;
  // };
  altitudeFt: CheckpointValue;
  temp: CheckpointValue;
  windDir: CheckpointValue;
  windVel: CheckpointValue;
  magneticVariance: CheckpointValue;
};

type Leg = {
  name: string;
  type: "climb" | "cruise" | "descend";
  from: Checkpoint;
  to: Checkpoint;
  trueCourse: CheckpointValue; //
  windCorrectionAngle: CheckpointValue;
  trueHeading: CheckpointValue;
  magneticVariance: CheckpointValue;
  magneticHeading: CheckpointValue;
  distance: CheckpointValue;
  trueAirSpeed: CheckpointValue;
  fuelBurn: CheckpointValue;
};

type Segment = Leg & {
  distance: CheckpointValue; // Distance between checkpoints
  time: CheckpointValue; // Time to travel this leg
  groundspeed: CheckpointValue; // Average groundspeed during this leg
  fuelBurnRate: CheckpointValue; // Fuel burn rate during this leg
  altitude: CheckpointValue;
};

type CheckpointValue = {
  value: number;
  unit: Unit;
};

type Unit = "NM" | "KTS" | "C" | "F" | "GAL" | "FT" | "DEG" | "GPH" | "MIN";

type ClimbNodeData = {
  pressureAltitudeFt: number;
  standardTempC: number;
  climbSpeedKIAS: number;
  rateofClimbFPM: number;
  fromSeaLevel: {
    timeMin: number;
    fuelUsed: number;
    distanceNM: number;
  };
};

type CruiseNodeData = {
  pressureAltitudeFt: 2000;
  variants: [
    {
      rpm: 2500;
    }
  ];
  standardTempC: number;
  climbSpeedKIAS: number;
  rateofClimbFPM: number;
  fromSeaLevel: {
    timeMin: number;
    fuelBurnGPH: number;
    distanceNM: number;
  };
};

type LegV2 = {
  name: string;
  type: "climb" | "cruise" | "descend";
  from: Checkpoint;
  to: Checkpoint;
  distance: CheckpointValue;
  altitudeFt: CheckpointValue;
  trueCourse: CheckpointValue;
  magneticVariance: CheckpointValue;
  isStart: boolean; // for start taxi takeoff allowance
  // trueCourse: CheckpointValue;
  // windCorrectionAngle: CheckpointValue;
  // trueHeading: CheckpointValue;
  // magneticVariance: CheckpointValue;
  // magneticHeading: CheckpointValue;
  // distance: CheckpointValue;
  // trueAirSpeed: CheckpointValue;
  // fuelBurn: CheckpointValue;
  // time: CheckpointValue;
  // groundspeed: CheckpointValue;
  //
  // temp: CheckpointValue;
  // windDir: CheckpointValue;
  // windVel: CheckpointValue;
  // magneticVariance: CheckpointValue;
};

type PageProps = {
  readonly params: Promise<Record<string, unknown>>;
  readonly searchParams?: Record<string, unknown>;
};

type LegParams = [
  from: number,
  to: number,
  type: "climb" | "cruise" | "descend",
  altitudeFt: number,
  distance: number,
  trueCourse: number,
  magneticeVariance: number,
  isStart: boolean
];

type AirportData = {
  airport: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    elevation_ft: number;
  };
  radio_frequencies: {
    ATIS?: string;
    CTAF: string;
    Ground?: string;
    Tower?: string;
    FSS: {
      name: string;
      frequency: string;
    };
    AWOS?: string;
  };
  runways: {
    runway: string;
    dimensions_ft: string;
    surface: string;
    condition: string;
    lighting: string;
    markings_condition: string;
  }[];
  fuel_services: string[];
};
