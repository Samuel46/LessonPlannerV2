import React, { useEffect, useState } from "react";
import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import { Row, Col, CardTitle, CardText } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import "@styles/base/pages/page-auth.scss";

const ConfirmEmail = ({ history, location }) => {
  const [skin, setSkin] = useSkin();

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { userInfoReset } = userResetPassword;

  const redirect = location.search ? location.search.split("=")[1] : "/home";
  useEffect(() => {
    if (userInfoReset) {
      history.push(redirect);
    }
  }, [history, userInfoReset, redirect]);

  const illustration =
      skin === "dark" ? "reset-password-v2-dark.svg" : "reset-password-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <h2 className="brand-text text-primary ml-1">Lesson Planner</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              Email confirmed🎉🎉
            </CardTitle>
            <CardText className="mb-2">
              Account activation completed successfully!!
            </CardText>
            <p className="text-center mt-2">
              <Link to="/login">
                <ChevronLeft className="mr-25" size={14} />
                <span className="align-middle">Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmEmail;
