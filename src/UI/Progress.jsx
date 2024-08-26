import { useQuiz } from '../context/QuizContext';

const Progress = () => {
	const {currentQuestion, numQuestions, points, answer} = useQuiz();
	return (
		<header className="progress">
			<progress max={numQuestions} value={currentQuestion + Number(answer !== null)} />
			<p>
				Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
			</p>
			<p><strong>{points}</strong> / 280</p>
		</header>
	)
}

export default Progress;