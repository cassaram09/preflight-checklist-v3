import { render } from "@testing-library/react";
import Checklist from "./Checklist";

describe("Checklist", () => {
  it("renders", async () => {
    const component = render(
      <Checklist
        title="Interior Preflight Inspection"
        data={{
          title: "Interior Preflight Inspection",
          color: "red",
          tasks: [
            {
              title: "Task 1",
              result: "Result 1",
              subtasks: [{ title: "Subtask 1", result: "Result 1" }],
            },
          ],
        }}
      />
    );

    expect(component).toBeTruthy();
  });
});
