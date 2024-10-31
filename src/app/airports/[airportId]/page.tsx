import { AirportDetailContainer } from "@/modules/airports";
import { promises as fs } from "fs";
import path from "path";

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
    const filePath = path.join("src/lib/airports", `${airportId}.json`);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (e: unknown) {
    console.error(`Error reading file for airport ${airportId}:`, e);
    return null;
  }
};
