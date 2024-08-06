import { useReducer } from "react";

function reducer(state, action) {
	switch (action.type) {
		case "increment":
			return {...state, count: state.count + state.step};
		case "decrement":
		return {...state, count: state.count - state.step};
		case "reset":
			return {step: 1, count: 0};
		case "setCount":
			return {...state, count: action.value};
		case "setStep":
			return {...state, step: action.value};
		default:
			return state;
	}
}

function DateCounter() {

	const initialState = {count: 0, step: 1};
	const [state, dispatch] = useReducer(reducer, initialState);
	const {count, step} = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
		dispatch({ type: "decrement", step });
  };

  const inc = function () {
		dispatch({ type: "increment", step });
  };

  const defineCount = function (e) {
		dispatch({ type: "setCount", value: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", value: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
