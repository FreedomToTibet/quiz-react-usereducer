import PropTypes from 'prop-types';

const Options = ({question, dispatch, answer}) => {
	const isAnsewered = answer !== null;
	// const isCorrect = answer === question.correctOption;
	// const isWrong = isAnsewered && !isCorrect;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
					disabled={isAnsewered}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${isAnsewered ? (index === question.correctOption ? "correct" : "wrong") : ""}`}
          onClick={() => dispatch({type: 'answer', payload: index})}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

Options.propTypes = {
  question: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctOption: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
};

export default Options;
