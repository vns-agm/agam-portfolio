import { render, screen } from "@testing-library/react";
import App from "./App";

beforeAll(() => {
  // jsdom doesn't implement these browser APIs.
  window.scrollTo = () => {};
  window.matchMedia =
    window.matchMedia ||
    (() => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
});

test("renders the navigation and footer", () => {
  render(<App />);
  expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  expect(screen.getAllByText("Agam Srivastava").length).toBeGreaterThan(0);
  expect(screen.getByRole("link", { name: /start a conversation/i })).toHaveAttribute(
    "href",
    "mailto:agamsrivastavavns1193@gmail.com"
  );
});
