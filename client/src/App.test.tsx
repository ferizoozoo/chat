import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import App from "./App";

beforeEach(() => {
  global.HTMLElement.prototype.scrollIntoView = vi.fn();
});

test("renders the app", () => {
  render(<App />);
  const formElement = document.querySelector("form");
  expect(formElement).toBeInTheDocument();
});

test("the app component has the modal component", () => {
  const { container } = render(<App />);
  const modalElement = container.querySelector(".overlay");
  expect(modalElement).toBeInTheDocument();
});

test("the app component has the chat component", () => {
  const { container } = render(<App />);
  const chatElement = container.querySelector(".layout");
  expect(chatElement).toBeInTheDocument();
});

test("submit a new user", async () => {
  const { container } = render(<App />);

  // Get input elements
  const usernameInput = screen.getByLabelText("Enter your username");
  const emailInput = screen.getByLabelText("Enter your email");

  // Type into inputs
  await userEvent.type(usernameInput, "John Doe");
  await userEvent.type(emailInput, "TtVbO@example.com");

  // Spy on the submit event
  const submitSpy = vi.fn();
  const formElement = container.querySelector("form");

  formElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent actual submission
    const formData = new FormData(formElement);
    submitSpy(Object.fromEntries(formData));
  });
  // Fire submit event
  fireEvent.submit(formElement);

  // Assertions
  expect(submitSpy).toHaveBeenCalledTimes(1);

  expect(submitSpy).toHaveBeenCalledWith({
    username: "John Doe",
    email: "TtVbO@example.com",
  });
});
