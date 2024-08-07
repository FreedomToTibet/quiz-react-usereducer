import PropTypes from 'prop-types';

const NextButton = ({dispatch, answer}) => {
	return (
		answer !== null && <div className="btn btn-ui" onClick={() => dispatch({type: "next"})}>Next</div>
	)
}

NextButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
};

export default NextButton;