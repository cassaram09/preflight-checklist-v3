import { classes } from "@/helpers/styles.helpers";
import styles from "./NavlogContainer.module.scss";
import NavLogTable from "../NavLogTable/NavLogTable";
import { legs, checkpoints } from "@/lib/plans/KCFO-KAKO";

export default function NavlogContainer(): JSX.Element {
  const cl = classes(styles);

  return (
    <div className={cl("root")}>
      <NavLogTable legs={legs} checkpoints={checkpoints} />
    </div>
  );
}
