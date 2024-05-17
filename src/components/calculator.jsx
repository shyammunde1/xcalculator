import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (newValue) => {
    setValue(value + newValue.toString());
  };

  const clearInput = () => {
    setValue("");
    setResult("");
  };

  const evaluateExpression = (expression) => {
    const operands = expression.match(/\d+\.?\d*/g);
    const operators = expression.match(/[+\-*/]/g);

    let result = parseFloat(operands[0]);
    for (let i = 0; i < operators.length; i++) {
      const operand = parseFloat(operands[i + 1]);
      const operator = operators[i];
      switch (operator) {
        case "+":
          result += operand;
          break;
        case "-":
          result -= operand;
          break;
        case "*":
          result *= operand;
          break;
        case "/":
          result /= operand;
          break;
        default:
          throw new Error("Invalid operator");
      }
    }
    return result;
  };

  const isOperator = (char) => {
    return "+-*/".includes(char);
  };
  const calculateResult = () => {
    const expression = value.trim();
    try {
      if (value.trim() === "") {
        setResult("");
      } else if (isOperator(expression[expression.length - 1])) {
        setResult("Error");
        setValue("");
      } else {
        const result = evaluateExpression(expression);
        setResult(result.toString());
      }
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <div className="container">
      <h1>React Calculator</h1>
      <div className="calculator">
        <div className="display">
          <input type="text" value={value} />
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          <button onClick={() => handleInput("7")}>7</button>
          <button onClick={() => handleInput("8")}>8</button>
          <button onClick={() => handleInput("9")}>9</button>
          <button onClick={() => handleInput("+")}>+</button>
          <button onClick={() => handleInput("4")}>4</button>
          <button onClick={() => handleInput("5")}>5</button>
          <button onClick={() => handleInput("6")}>6</button>
          <button onClick={() => handleInput("-")}>-</button>
          <button onClick={() => handleInput("1")}>1</button>
          <button onClick={() => handleInput("2")}>2</button>
          <button onClick={() => handleInput("3")}>3</button>
          <button onClick={() => handleInput("*")}>*</button>
          <button onClick={clearInput}>C</button>
          <button onClick={() => handleInput("0")}>0</button>
          <button className="equal" onClick={calculateResult}>
            =
          </button>
          <button onClick={() => handleInput("/")}>/</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
