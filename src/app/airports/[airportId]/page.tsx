import { AirportDetailContainer } from "@/modules/airports";

import KAKO from "../../../lib/airports/KAKO.json";
import KCFO from "../../../lib/airports/KCFO.json";
import KLIC from "../../../lib/airports/KLIC.json";

export default async function AirportIdPage(props: PageProps) {
  const { airportId } = await props.params;
  const airport = await getPageData(airportId as string);

  if (!airport) {
    return <div>Airport not found</div>;
  }

  return <AirportDetailContainer airport={airport} />;
}

const getPageData = async (airportId: string): Promise<AirportData | null> => {
  try {
    const obj = {
      KAKO,
      KCFO,
      KLIC,
    };

    const airport = obj[airportId as keyof typeof obj] as AirportData;

    return airport;
  } catch (e: unknown) {
    console.error(`Error reading file for airport ${airportId}:`, e);
    return null;
  }
};
