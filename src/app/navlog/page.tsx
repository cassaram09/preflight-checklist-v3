import { promises as fs } from "fs";
import Link from "next/link";
import path from "path";

export default async function NavlogPage() {
  const plans = await getPageData();
  return (
    <ul>
      {plans.map((plan) => (
        <li key={plan}>
          <Link href={`/navlog/${plan}`}>{plan}</Link>
        </li>
      ))}
    </ul>
  );
}

const getPageData = async (): Promise<string[]> => {
  try {
    const folderPath = "src/lib/plans";
    const fileNames = await readFileNamesFromFolder(folderPath);
    console.log("Files in directory:", fileNames);

    return fileNames.map((fileName) => fileName.replace(".ts", ""));
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
