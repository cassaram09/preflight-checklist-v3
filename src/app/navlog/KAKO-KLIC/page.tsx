import { NavLogTable } from "@/features/navlog";
import { checkpoints, legs } from "@/lib/plans/KAKO-KLIC";

export default async function NavlogPage() {
  return <NavLogTable checkpoints={checkpoints} legs={legs} />;
}
