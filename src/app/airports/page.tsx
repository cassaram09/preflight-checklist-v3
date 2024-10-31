import { Text } from "@/primitives";
import { promises as fs } from "fs";
import Link from "next/link";
import path from "path";

export default async function NavlogPage() {
  const airports = await getPageData();
  return (
    <ul style={{ display: "grid", gap: "16px", padding: "12px" }}>
      {airports.map((airport) => (
        <li key={airport}>
          <Link href={`/airports/${airport}`}>
            <Text variant="body2" text={airport} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

const getPageData = async (): Promise<string[]> => {
  try {
    const folderPath = "src/lib/airports";
    const fileNames = await readFileNamesFromFolder(folderPath);
    console.log("Files in directory:", fileNames);

    return fileNames.map((fileName) => fileName.replace(".json", ""));
  } catch (e: unknown) {
    console.error("ERROR", e);
    return [];
  }
};

const readFileNamesFromFolder = async (
  folderPath: string
): Promise<string[]> => {
  try {
    const fullPath = path.resolve(folderPath);

    const files = await fs.readdir(fullPath);

    return files;
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
};
