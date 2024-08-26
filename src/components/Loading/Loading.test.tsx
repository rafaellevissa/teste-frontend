import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Loading from "./Loading";

test("renders correctly and contains Backdrop, CircularProgress, and Typography", () => {
  const { getByTestId, getByText } = render(<Loading />);

  const backdrop = getByTestId("backdrop");
  expect(backdrop).toBeInTheDocument();

  const circularProgress = getByTestId("circular-progress");
  expect(circularProgress).toBeInTheDocument();

  const typography = getByText(/Loading.../i);
  expect(typography).toBeInTheDocument();
});
