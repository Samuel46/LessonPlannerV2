import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSkin } from "@hooks/useSkin";
import Message from "../../components/Message";
import InputPasswordToggle from "@components/input-password-toggle";

import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button,
  Badge,
} from "reactstrap";
import "@styles/base/pages/page-auth.scss";
import { register } from "../../redux/actions/userActions";
import Loader from "../../components/Loader";
import { Select } from "antd";
const { Option } = Select;

const RegisterV2 = ({ history, location }) => {
  const [skin, setSkin] = useSkin();
  //  register logics
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("school");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/home";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, role));
    }
  };
  const illustration =
      skin === "dark" ? "register-v2-dark.svg" : "register-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const RememberMe = () => {
    return (
      <Fragment>
        I agree to
        <a className="ml-25" href="/" onClick={(e) => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    );
  };
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
              Adventure starts here 🚀
            </CardTitle>
            <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText>
            {message && <Message variant="danger">{message}</Message>}
            {error &&
              error.map((err) => (
                <Message variant="danger">{err && err}</Message>
              ))}

            {loading && <Loader />}
            <Form
              className="auth-register-form mt-2"
              onSubmit={submitHandler}
              method="POST"
            >
              {/* Role */}
              <FormGroup>
                <Label className="form-label">
                  <Badge color="info" className="badge-glow">
                    Role
                  </Badge>
                </Label>
                <Select
                  defaultValue="school"
                  className="mt-1"
                  size="large"
                  placeholder="Select a Role"
                  style={{ width: "100%" }}
                  onChange={setRole}
                  value={role}
                >
                  <Option value="school">School</Option>
                  <Option value="teacher">Teacher</Option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="register-username">
                  Full Name
                </Label>
                <Input
                  type="text"
                  id="register-username"
                  placeholder="Enter Your Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="register-email">
                  Email
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="register-email"
                  placeholder="Email Address"
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="register-password">
                  Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="register-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label className="form-label" for="register-password">
                  Confirm Password
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="register-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="checkbox"
                  className="custom-control-Primary"
                  id="remember-me"
                  label={<RememberMe />}
                />
              </FormGroup>
              <Button.Ripple type="submit" color="primary" block>
                Sign up
              </Button.Ripple>
            </Form>
            <p className="text-center mt-2">
              <span className="mr-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterV2;
