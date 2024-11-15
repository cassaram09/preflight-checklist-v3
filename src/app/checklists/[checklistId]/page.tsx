import { Checklist, ChecklistData } from "@/features/checklists";
import { getBaseUrl } from "@/helpers/utils.helpers";
import { Container, Text } from "@/primitives";
import Link from "next/link";

export default async function ChecklistIdPage({
  params,
}: PageProps): Promise<JSX.Element> {
  const { checklistId } = await params;

  const checklist = await getPageData(checklistId as string);

  if (!checklist) {
    return <div>Checklist not found</div>;
  }

  return (
    <main>
      <Container>
        <Link href={"/checklists"}>
          <Text text={"< Back"} variant="body4" component="p" />
        </Link>

        <Checklist
          title={checklist.title}
          data={checklist}
          storageKey={`checklist-${checklistId}`}
        />
      </Container>
    </main>
  );
}

const getPageData = async (
  checklistId: string
): Promise<ChecklistData | null> => {
  try {
    const res = await fetch(
      `${getBaseUrl()}/checklist-data/${checklistId}.json`
    );

    const data = await res.json();

    return data;
  } catch (e: unknown) {
    console.error("ERROR", e);
    return null;
  }
};
