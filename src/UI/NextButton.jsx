import PropTypes from 'prop-types';

const NextButton = ({dispatch, answer, currentQuestion, numQuestions}) => {
	if(currentQuestion < numQuestions -1) return (
		answer !== null && <div className="btn btn-ui" onClick={() => dispatch({type: "next"})}>Next</div>
	)

	if(currentQuestion === numQuestions -1) return (
		answer !== null && <div className="btn btn-ui" onClick={() => dispatch({type: "finished"})}>Finish</div>
	)
}

NextButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
	currentQuestion: PropTypes.number.isRequired,
	numQuestions: PropTypes.number.isRequired,
};

export default NextButton;