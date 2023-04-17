import { render, fireEvent, act } from "@testing-library/react";
import NavBar from "./NavBar";

// Mock the fetch API response
const mockFetchResponse = {
  bpi: {
    USD: {
      rate_float: 50000,
    },
    EUR: {
      rate_float: 40000,
    },
    GBP: {
      rate_float: 30000,
    },
  },
  time: {
    updated: "2023-04-17T10:00:00Z",
  },
};

beforeEach(() => {
  // Mock fetch API
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockFetchResponse),
    })
  );
});
test("Converts any input value ", () => {
  render(<Conversions />);
  const convert = screen.getByLabelText(/amount/i);
  fireEvent.change(convert, { target: { value: 1 } });
  expect(convert.value).toBe("1");
});

afterEach(() => {
  // Reset fetch API mock
  global.fetch.mockClear();
});

test("NavBar renders correctly with conversion rates", async () => {
  // Render NavBar component
  const { getByText, getByLabelText } = render(<NavBar />);

  // Wait for API fetch to complete
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  // Check if conversion rates are rendered correctly
  expect(getByText("1 USD/BTC")).toBeInTheDocument();
  expect(getByText("50000 USD")).toBeInTheDocument();
  expect(getByText("2 EUR/BTC")).toBeInTheDocument();
  expect(getByText("40000 EUR")).toBeInTheDocument();
  expect(getByText("3 GBP/BTC")).toBeInTheDocument();
  expect(getByText("30000 GBP")).toBeInTheDocument();

  // Update currency and amount input
  const currencySelect = getByLabelText("Select Currency");
  const amountInput = getByLabelText("Enter Amount");
  fireEvent.change(currencySelect, { target: { value: "EUR" } });
  fireEvent.change(amountInput, { target: { value: "5" } });

  // Check if currency and amount are updated correctly
  expect(currencySelect.value).toBe("EUR");
  expect(amountInput.value).toBe("5");

  // Trigger refetch
  const refetchButton = getByText("Refresh Rates");
  fireEvent.click(refetchButton);

  // Check if refetch is triggered and stopRefetch is set to true
  expect(global.fetch).toHaveBeenCalledTimes(2); // Initial fetch + refetch
  expect(refetchButton.disabled).toBe(true);
});
