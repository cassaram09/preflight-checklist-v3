"use client";

import { classes } from "@/helpers/styles.helpers";
import styles from "./Checklist.module.scss";
import { Text } from "@/primitives";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

export type ChecklistProps = {
  readonly title: string;
  readonly data: ChecklistData;
  readonly storageKey: string;
};

export type ChecklistData = {
  title: string;
  color: string;
  tasks: {
    title: string;
    result: string;
    critical?: boolean;
    subtasks?: {
      title: string;
      result: string;
    }[];
  }[];
};

export default function Checklist({
  title,
  data,
  storageKey,
}: ChecklistProps): JSX.Element {
  const cl = classes(styles);

  const [tasksCompleted, setTasksCompleted] = useState<Record<string, boolean>>(
    {}
  );

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    const storedData = localStorage.getItem(storageKey);

    if (storedData) {
      setTasksCompleted(JSON.parse(storedData));
      setOpen(true);
    }
  }, []);

  const toggleTaskCompleted = (uniqueTaskName: string) => {
    const _tasks = structuredClone(tasksCompleted);
    if (_tasks[uniqueTaskName]) {
      delete _tasks[uniqueTaskName];
      setTasksCompleted(_tasks);
      localStorage.setItem(storageKey, JSON.stringify(_tasks));

      navigator.vibrate(300);
    } else {
      setTasksCompleted({ ..._tasks, [uniqueTaskName]: true });
      navigator.vibrate(150);
      localStorage.setItem(
        storageKey,
        JSON.stringify({ ..._tasks, [uniqueTaskName]: true })
      );
    }
  };

  const completedTasks = Object.keys(tasksCompleted).length;
  const totalTasks = data.tasks.length;

  const resetChecklist = () => setTasksCompleted({});

  return (
    <div className={cl("root")}>
      <div
        className={cl(["header", completedTasks == totalTasks && "complete"])}
      >
        <button onClick={toggle} className={cl(["section_toggle"])}>
          <Text text={title} variant="body1" component="h2" />
          <Text text={`(${completedTasks}/${totalTasks})`} variant="body2" />
        </button>

        <button onClick={resetChecklist} className={cl("reset")}>
          <Text text={"Reset"} variant="body1" component="h2" />
        </button>
      </div>

      <AnimateHeight height={open ? "auto" : 0} duration={250}>
        <div className={cl("tasks")}>
          {data.tasks.map((task, i) => {
            const uniqueTaskName = `${title}__${task.title}__${task.result}`;

            const completed = tasksCompleted[uniqueTaskName];

            return (
              <div
                key={i}
                className={cl([
                  "task",
                  !!task.subtasks?.length && "has_subtasks",
                  completed && "completed",
                ])}
              >
                <button
                  onClick={() => toggleTaskCompleted(uniqueTaskName)}
                  type="button"
                  className={cl("button")}
                >
                  <Text text={task.title} variant="body4" component="p" />
                  <Text text={task.result} variant="body4" component="p" />
                </button>

                <div className={cl("subtasks")}>
                  {task.subtasks?.map((subtask, j) => (
                    <div key={j} className={cl("subtask")}>
                      <button
                        onClick={() => toggleTaskCompleted(subtask.title)}
                        type="button"
                      >
                        <Text
                          text={subtask.title}
                          variant="body1"
                          component="p"
                        />
                        <Text
                          text={subtask.result}
                          variant="body1"
                          component="p"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </AnimateHeight>
    </div>
  );
}
