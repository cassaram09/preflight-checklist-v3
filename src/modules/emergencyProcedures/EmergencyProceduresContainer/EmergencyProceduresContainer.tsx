import { classes } from "@/helpers/styles.helpers";
import styles from "./EmergencyProceduresContainer.module.scss";
import { Container, Text } from "@/primitives";
import { Checklist } from "@/components";
import { ChecklistData } from "@/components/Checklist/Checklist";
import EngineFailureDuringTakeoffRoll from "../../../../data/EngineFailureDuringTakeoffRoll.json";
export default function EmergencyProceduresContainer(): JSX.Element {
  const cl = classes(styles);

  return (
    <div className={cl("root")}>
      <Container>
        <Text text="Checklist" variant="h1" component="h1" />

        <Checklist
          title="Engine Failure During Takeoff Roll"
          data={EngineFailureDuringTakeoffRoll as ChecklistData}
        />
      </Container>
    </div>
  );
}

export const LOCALE_STORAGE_KEY = "preflight__emergency_procedures";
