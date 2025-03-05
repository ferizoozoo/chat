import { fireEvent, render, screen } from "@testing-library/react";
import Chat from "../../ui/chat";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";

beforeEach(() => {
  global.HTMLElement.prototype.scrollIntoView = vi.fn();
});

vi.mock("../../hooks/useSocket", () => ({
  default: vi.fn(() => ({
    emit: vi.fn(),
  })),
}));

vi.mock("../../hooks/useLocalStorage", () => ({
  default: vi.fn(() => {
    return ["", () => {}];
  }),
}));

vi.mock("../../apis/room", () => ({
  getUserRooms: vi.fn(() => Promise.resolve({})),
}));

test("render the chat component", () => {
  const { container } = render(<Chat />);
  const availableRoomsElement = container.querySelector(".available-rooms");
  const chatRoomElement = container.querySelector(".chatbox");
  expect(availableRoomsElement).toBeInTheDocument();
  expect(chatRoomElement).toBeInTheDocument();
});

test("should open the modal when the button is clicked", () => {
  render(<Chat />);

  const plusButtons = screen.getAllByText("+");
  const openModalButton = plusButtons.find((button) =>
    button.classList.contains("create-room")
  );
  expect(openModalButton).toBeInTheDocument();

  if (openModalButton) fireEvent.click(openModalButton);

  const modalElement = screen.getByLabelText("Room title");
  expect(modalElement).toBeInTheDocument();
});
