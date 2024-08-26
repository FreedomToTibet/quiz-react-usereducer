import { useQuiz } from '../context/QuizContext';

const NextButton = () => {
	const {dispatch, answer, currentQuestion, numQuestions} = useQuiz();

	if(currentQuestion < numQuestions -1) return (
		answer !== null && <div className="btn btn-ui" onClick={() => dispatch({type: "next"})}>Next</div>
	)

	if(currentQuestion === numQuestions -1) return (
		answer !== null && <div className="btn btn-ui" onClick={() => dispatch({type: "finished"})}>Finish</div>
	)
}

export default NextButton;