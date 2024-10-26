"use client";

import { classes } from "@/helpers/styles.helpers";
import styles from "./HomeContainer.module.scss";
import { Container, Text } from "@/primitives";
import InteriorPreflightInspectionChecklist from "../../../../data/InteriorPreflightInspection.json";
import { Checklist } from "@/components";
import { ChecklistData } from "@/components/Checklist/Checklist";

export default function HomeContainer(): JSX.Element {
  const cl = classes(styles);

  // const [tasksCompleted, setTasksCompleted] = useState<Record<string, boolean>>(
  //   {}
  // );

  // useEffect(() => {
  //   const storedData = localStorage.getItem(LOCALE_STORAGE_KEY);

  //   if (storedData) {
  //     setTasksCompleted(JSON.parse(storedData));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(tasksCompleted));
  // }, [tasksCompleted]);

  // const toggleTaskCompleted = (uniqueTaskName: string) => {
  //   const _tasks = structuredClone(tasksCompleted);
  //   if (_tasks[uniqueTaskName]) {
  //     delete _tasks[uniqueTaskName];
  //     setTasksCompleted(_tasks);
  //     navigator.vibrate(300);
  //   } else {
  //     setTasksCompleted({ ..._tasks, [uniqueTaskName]: true });
  //     navigator.vibrate(150);
  //   }
  // };

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
