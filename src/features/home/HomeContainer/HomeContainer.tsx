import { classes } from "@/helpers/styles.helpers";
import styles from "./HomeContainer.module.scss";

export default function HomeContainer(): JSX.Element {
  const cl = classes(styles);

  return <div className={cl("root")}>home.</div>;
}
