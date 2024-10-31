import { classes } from "@/helpers/styles.helpers";
import styles from "./Header.module.scss";
import Link from "next/link";
import { Text } from "@/primitives";

export default function Header(): JSX.Element {
  const cl = classes(styles);

  return (
    <header className={cl("root")}>
      <nav>
        <Link href="/">
          <Text variant="body2" text={"Workflows"} />
        </Link>

        <Link href="/emergency-procedures">
          <Text variant="body2" text={"Emg Proc"} />
        </Link>

        <Link href="/navlog">
          <Text variant="body2" text={"Navlog"} />
        </Link>
        <Link href="/airports">
          <Text variant="body2" text={"Airports"} />
        </Link>
      </nav>
    </header>
  );
}
