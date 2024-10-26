import { render } from "@testing-library/react";
import Container from "./Container";

describe("Container", () => {
  it("renders component and children", async () => {
    const { getByText } = render(
      <Container>
        <p>hello world</p>
      </Container>
    );

    getByText("hello world");
  });
});
