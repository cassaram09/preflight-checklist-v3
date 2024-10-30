import { NavLogTable } from "@/modules/navlog";
import { checkpoints, legs } from "@/lib/plans/KAKO-KLIC";

export default async function NavlogPage() {
  return <NavLogTable checkpoints={checkpoints} legs={legs} />;
}
