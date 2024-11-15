import { classes } from "@/helpers/styles.helpers";
import styles from "./Header.module.scss";
import Link from "next/link";

export default function Header(): JSX.Element {
  const cl = classes(styles);

  return (
    <header className={cl("root")} tabIndex={-1}>
      <nav>
        <Link href="/">
          <svg className={cl("icon")}>
            <use href="/icons/sprite.icon.svg#home" />
          </svg>
        </Link>

        <Link href="/checklists">
          <svg className={cl("icon")}>
            <use href="/icons/sprite.icon.svg#checklist" />
          </svg>
        </Link>

        <Link href="/emergency-procedures">
          <svg className={cl("icon")}>
            <use href="/icons/sprite.icon.svg#warning" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
