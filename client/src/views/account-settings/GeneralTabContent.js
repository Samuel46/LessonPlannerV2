import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/actions/userActions";

import {
  Button,
  Media,
  Label,
  Row,
  Col,
  Input,
  FormGroup,
  Alert,
  Form,
} from "reactstrap";
import Avatar from "@components/avatar";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const GeneralTabs = ({ user: { data } }) => {
  // const [userinfo, setUserInfo] = useState(data);
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading, error } = userUpdateProfile;

  const renderUserAvatar = () => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        "light-success",
        "light-danger",
        "light-warning",
        "light-info",
        "light-primary",
        "light-secondary",
      ],
      color = states[stateNum];

    const updateHandler = (e) => {
      e.preventDefault();
      dispatch(updateHandler(name, email));
    };

    return (
      <Avatar
        initials
        color={color}
        className="rounded mr-2 my-25"
        content={data.name}
        imgHeight="40"
        imgWidth="40"
        status="online"
        contentStyles={{
          borderRadius: 999999,
          fontSize: "calc(20px)",
          width: "100%",
          height: "100%",
        }}
        style={{
          height: "40px",
          width: "40px",
          borderRadius: 999999,
        }}
      />
    );
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(name, email));
  };

  return (
    <Fragment>
      <Media>
        <Media className="mr-25" left>
          {renderUserAvatar()}
        </Media>
      </Media>
      <Form className="mt-2" onSubmit={updateHandler} method="PUT">
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label for="name">Full Name</Label>
              <Input
                value={name}
                id="name"
                name="fullName"
                placeholder="fullName"
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input
                value={email}
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label for="company">Role</Label>
              <Input
                value={data.role}
                disabled
                id="role"
                name="role"
                placeholder="Role"
                disable
              />
            </FormGroup>
          </Col>
          <Col className="mt-75" sm="12">
            {data.isEmailConfirmed === false ? (
              <Alert className="mb-50" color="warning">
                <h4 className="alert-heading">
                  Your email is not confirmed. Please check your inbox.
                </h4>
              </Alert>
            ) : null}
          </Col>
          <Col className="mt-2" sm="12">
            <Button.Ripple type="submit" className="mr-1" color="primary">
              Save changes
            </Button.Ripple>
            <Button.Ripple color="secondary" outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default GeneralTabs;
