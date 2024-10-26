import { classes } from "@/helpers/styles.helpers";
import styles from "./HomeContainer.module.scss";
import { Container, Text } from "@/primitives";
import InteriorPreflightInspectionChecklist from "../../../../data/InteriorPreflightInspection.json";
import { Checklist } from "@/components";
import { ChecklistData } from "@/components/Checklist/Checklist";

export default function HomeContainer(): JSX.Element {
  const cl = classes(styles);

  return (
    <div className={cl("root")}>
      <Container>
        <Text text="Checklist" variant="h1" component="h1" />

        <Checklist
          title="Interior Preflight Inspection"
          data={InteriorPreflightInspectionChecklist as ChecklistData}
        />
      </Container>
    </div>
  );
}

export const LOCALE_STORAGE_KEY = "preflight__tasks";
