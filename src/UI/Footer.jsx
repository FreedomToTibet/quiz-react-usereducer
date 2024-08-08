import PropTypes from 'prop-types';

const Footer = ({children}) => {
	return (
		<footer>{children}</footer>
	)
}

Footer.propTypes = {
  children: PropTypes.node,
};

export default Footer