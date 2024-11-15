import { classes } from "@/helpers/styles.helpers";
import styles from "./ChecklistsContainer.module.scss";
import { Text } from "@/primitives";
import Link from "next/link";

export default function ChecklistsContainer(): JSX.Element {
  const cl = classes(styles);

  return (
    <div className={cl("root")}>
      <Text text="Checklists" variant="h1" component="h1" />

      <ul className={cl("list")}>
        {LINKS.map((link) => (
          <li key={link.href} className={cl(["item", link.color])}>
            <Link href={link.href} className={cl("link")}>
              <Text text={link.title} variant="body3" component="p" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const LINKS = [
  {
    title: "Interior Preflight Inspection",
    href: "/checklists/interior-preflight-inspection",
    color: "gold",
  },
  {
    title: "Exterior Preflight Inspection",
    href: "/checklists/exterior-preflight-inspection",
    color: "gold",
  },
  {
    title: "Before Start",
    href: "/checklists/before-start",
    color: "blue",
  },
  {
    title: "Engine Start",
    href: "/checklists/engine-start",
    color: "blue",
  },
  {
    title: "Before Taxi",
    href: "/checklists/before-taxi",
    color: "orange",
  },
  {
    title: "Before Takeoff",
    href: "/checklists/before-takeoff",
    color: "orange",
  },
  {
    title: "Normal Takeoff",
    href: "/checklists/normal-takeoff",
    color: "green",
  },
  {
    title: "Climb",
    href: "/checklists/climb",
    color: "green",
  },
  {
    title: "Cruise",
    href: "/checklists/cruise",
    color: "green",
  },
  {
    title: "Before Landing",
    href: "/checklists/before-landing",
    color: "red",
  },
  {
    title: "After Landing",
    href: "/checklists/after-landing",
    color: "purple",
  },
  {
    title: "Shutdown",
    href: "/checklists/shutdown",
    color: "purple",
  },
];
