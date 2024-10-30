import { NavlogContainer } from "@/modules/navlog";

export default async function NavlogPage(props: PageProps) {
  const { planId } = await props.params;
  const legs = await getPageData(planId as string);

  if (!legs) {
    return <div>Plan not found</div>;
  }

  return <NavlogContainer legs={legs} />;
}

const getPageData = async (slug: string): Promise<LegV2[] | null> => {
  try {
    const imported = await import(`@/lib/plans/${slug}`);

    if (imported && imported.legs) {
      return imported.legs;
    } else {
      console.warn(`No 'legs' data found in ${slug}.ts`);
      return null;
    }
  } catch (e: unknown) {
    console.error("ERROR", e);
    return null;
  }
};
