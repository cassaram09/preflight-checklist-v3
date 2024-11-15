import { classes } from "@/helpers/styles.helpers";
import styles from "./EmergencyProceduresContainer.module.scss";
import { Container, Text } from "@/primitives";
export default function EmergencyProceduresContainer(): JSX.Element {
  const cl = classes(styles);

  return (
    <div className={cl("root")}>
      <Container>
        <Text text="Checklist" variant="h1" component="h1" />
      </Container>
    </div>
  );
}

export const LOCALE_STORAGE_KEY = "preflight__emergency_procedures";
