import React from "react";
import { render, screen, act, renderHook } from "@testing-library/react";
import App from "../app/App";
import WordsCounter from "../microcomponents/wordsCounter/WordsCounter";
import useClientMeasures from "../hooks/useClientMEasures";
import useRequest from "../hooks/useRequest";
import usePredeterminatelanguge from "../hooks/usePredeterminateLanguage";
import CustomTextArea from '../components/customTextarea/CustomTextArea'
//test that thecomponent renders without errors.
it("should render without errorsin app component", () => {
  render(<App />);
});

// Tests that the component renders without errors
it("should render without errors", () => {
  render(<WordsCounter text="Hello" readOnly={false} />);
});

// Tests that the function returns an object with deviceHeight and deviceWidth properties.
it("should return an object with deviceHeight and deviceWidth properties", () => {
  // Arrange
  const { result } = renderHook(() => useClientMeasures());

  // Act
  const { measures } = result.current;

  // Assert
  expect(measures).toHaveProperty("deviceHeight");
  expect(measures).toHaveProperty("deviceWidth");
});

// Tests that the function returns an object with a property 'languagePred' that is defined.
it('should return an object with a defined "languagePred" property', () => {
  const { result } = renderHook(() => usePredeterminatelanguge());
  expect(result.current.languagePred).toBeDefined();
});

    // Tests that the CustomTextArea component renders with all props passed
    it('should render CustomTextArea component with all props passed', () => {
      // Arrange
      const deviceType = "desktop";
      const children = <div>Test Children</div>;
      const readOnly = false;
      const handlerSelectedLanguage = jest.fn();
      const selectedLanguage = "English";
      const handlerValueInput = jest.fn();
      const data_name = "testData";
      const textAreaValue = "Test Text";

      // Act
      render(
        <CustomTextArea
          deviceType={deviceType}
          children={children}
          readOnly={readOnly}
          handlerSelectedLanguage={handlerSelectedLanguage}
          selectedLanguage={selectedLanguage}
          handlerValueInput={handlerValueInput}
          data_name={data_name}
          textAreaValue={textAreaValue}
        />
      );

      // Assert
      expect(screen.getByText("Test Children")).toBeInTheDocument();
      expect(screen.getByText("English")).toBeInTheDocument();
      expect(screen.getByText("Test Text")).toBeInTheDocument();
    });