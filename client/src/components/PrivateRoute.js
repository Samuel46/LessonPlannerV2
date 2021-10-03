import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  userDetails: { user, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      user === null && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  userDetails: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userDetails: state.userDetails,
});

export default connect(mapStateToProps)(PrivateRoute);
