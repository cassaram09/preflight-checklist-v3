import { NavLogTable } from "@/modules/navlog";
import { checkpoints, legs } from "@/lib/plans/KLIC-KCFO";

export default async function NavlogPage() {
  return <NavLogTable checkpoints={checkpoints} legs={legs} />;
}
