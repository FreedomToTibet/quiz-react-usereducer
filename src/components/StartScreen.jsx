// import { useQuiz } from "../contexts/QuizContext";
import PropTypes from 'prop-types';

const StartScreen = ({numQuestions, dispatch}) => {
  // const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let&lsquo;s start
      </button>
    </div>
  );
}

StartScreen.propTypes = {
  numQuestions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default StartScreen;
