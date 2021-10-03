import React, { useEffect, useState } from "react";
import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import InputPassword from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { resetPassword } from "../../redux/actions/userActions";
import "@styles/base/pages/page-auth.scss";

const ResetPasswordV2 = ({ match, history, location }) => {
  const [skin, setSkin] = useSkin();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, userInfoReset } = userResetPassword;

  const redirect = location.search ? location.search.split("=")[1] : "/login";
  useEffect(() => {
    if (userInfoReset) {
      history.push(redirect);
    }
  }, [history, userInfoReset, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match❌");
    } else {
      dispatch(resetPassword(match.params.resettoken, password));
    }
  };

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
              Reset Password 🔒
            </CardTitle>
            <CardText className="mb-2">
              Your new password must be different from previously used passwords
            </CardText>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form
              className="auth-reset-password-form mt-2"
              method="POST"
              onSubmit={submitHandler}
            >
              <FormGroup>
                <Label className="form-label" for="new-password">
                  New Password
                </Label>
                <InputPassword
                  className="input-group-merge"
                  id="new-password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="confirm-password">
                  Confirm Password
                </Label>
                <InputPassword
                  className="input-group-merge"
                  id="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <Button.Ripple color="primary" type="submit" block>
                Set New Password
              </Button.Ripple>
            </Form>
            <p className="text-center mt-2">
              <Link to="/pages/login-v2">
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

export default ResetPasswordV2;
