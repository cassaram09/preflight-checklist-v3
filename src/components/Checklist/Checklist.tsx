"use client";

import { classes } from "@/helpers/styles.helpers";
import styles from "./Checklist.module.scss";
import { Text } from "@/primitives";
import { useEffect, useState } from "react";
import { LOCALE_STORAGE_KEY } from "@/modules/home/HomeContainer/HomeContainer";
import AnimateHeight from "react-animate-height";

export type ChecklistProps = {
  readonly title: string;
  readonly data: ChecklistData;
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
}: ChecklistProps): JSX.Element {
  const cl = classes(styles);

  const [tasksCompleted, setTasksCompleted] = useState<Record<string, boolean>>(
    {}
  );

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCALE_STORAGE_KEY);

    if (storedData) {
      setTasksCompleted(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(tasksCompleted));
  }, [tasksCompleted]);

  const toggleTaskCompleted = (uniqueTaskName: string) => {
    const _tasks = structuredClone(tasksCompleted);
    if (_tasks[uniqueTaskName]) {
      delete _tasks[uniqueTaskName];
      setTasksCompleted(_tasks);
      navigator.vibrate(300);
    } else {
      setTasksCompleted({ ..._tasks, [uniqueTaskName]: true });
      navigator.vibrate(150);
    }
  };

  const completedTasks = Object.keys(tasksCompleted).length;
  const totalTasks = data.tasks.length;

  const resetChecklist = () => setTasksCompleted({});

  return (
    <div className={cl("root")}>
      <button
        onClick={toggle}
        className={cl([
          "section_toggle",
          completedTasks == totalTasks && "complete",
        ])}
      >
        <Text text={title} variant="body1" component="h2" />
        <Text text={"toggle"} variant="body2" />
        <Text text={`(${completedTasks}/${totalTasks})`} variant="body2" />
      </button>

      <button onClick={resetChecklist} className={cl("reset")}>
        reset
      </button>

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
                  <Text text={task.title} variant="h3" component="h3" />
                  <Text text={task.result} variant="h3" component="h3" />
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
