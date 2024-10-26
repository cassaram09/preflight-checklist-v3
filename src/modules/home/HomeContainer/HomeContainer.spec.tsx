import { render } from "@testing-library/react";
import HomeContainer from "./HomeContainer";

describe("HomeContainer", () => {
  it("renders", async () => {
    const component = render(<HomeContainer />);

    expect(component).toBeTruthy();
  });
});
