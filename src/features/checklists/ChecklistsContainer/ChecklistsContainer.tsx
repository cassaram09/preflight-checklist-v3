import { classes } from "@/helpers/styles.helpers";
import styles from "./ChecklistsContainer.module.scss";
import { Container, Text } from "@/primitives";
import Link from "next/link";

export default function ChecklistsContainer(): JSX.Element {
  const cl = classes(styles);

  return (
    <div className={cl("root")}>
      <Container className={cl("container")}>
        <Text text="Checklists" variant="h1" component="h1" />

        <ul className={cl("list")}>
          {LINKS.map((link) => (
            <li key={link.href} className={cl("item")}>
              <Link href={link.href}>
                <Text text={link.title} variant="body1" component="p" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

const LINKS = [
  {
    title: "Interior Preflight Inspection",
    href: "/checklists/interior-preflight-inspection",
  },
  {
    title: "Exterior Preflight Inspection",
    href: "/checklists/exterior-preflight-inspection",
  },
  {
    title: "Before Start",
    href: "/checklists/before-start",
  },
  {
    title: "Engine Start",
    href: "/checklists/engine-start",
  },
  {
    title: "Before Taxi",
    href: "/checklists/before-taxi",
  },
  {
    title: "Before Takeoff",
    href: "/checklists/before-takeoff",
  },
  {
    title: "Normal Takeoff",
    href: "/checklists/normal-takeoff",
  },
  {
    title: "Climb",
    href: "/checklists/climb",
  },
  {
    title: "Cruise",
    href: "/checklists/cruise",
  },
  {
    title: "Before Landing",
    href: "/checklists/before-landing",
  },
  {
    title: "After Landing",
    href: "/checklists/after-landing",
  },
  {
    title: "Shutdown",
    href: "/checklists/shutdown",
  },
];
