import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => {
  return (  
    <>
      <h1>Auth</h1>
      {children}
    </>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node,
};
 
export default AuthLayout;