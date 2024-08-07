import PropTypes from 'prop-types';

const Progress = ({ currentQuestion, numQuestions, points, answer }) => {
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

Progress.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  numQuestions: PropTypes.number.isRequired,
	points: PropTypes.number.isRequired,
	answer: PropTypes.number
};

export default Progress;