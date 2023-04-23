import React from "react";
import { render, screen } from "@testing-library/react";

import '@testing-library/jest-dom';
import NavBar from "./NavBar";


describe("Currency", () => {
    test("displays the correct header", () => {
      render(<NavBar/>);
      const headerElement = screen.queryByText('Current Conversion Rates');
      expect(headerElement).toBeTruthy();
    });
  });

  