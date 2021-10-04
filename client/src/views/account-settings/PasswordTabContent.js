import { useState } from "react";
import { Form, FormGroup, Row, Col, Button } from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../redux/actions/userActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Spinner from "@components/spinner/Fallback-spinner";

const PasswordTabContent = ({ user: { data } }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { loading, error } = userUpdatePassword;

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserPassword(currentPassword, newPassword));
    }
  };
  console.log(error && error, "samue");

  return (
    <>
      <Form onSubmit={updatePasswordHandler}>
        {/* {<Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>} */}
        {loading && <Spinner />}

        <Row>
          <Col sm="6">
            <FormGroup>
              <InputPasswordToggle
                label="Old Password"
                htmlFor="old-password"
                name="old-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <FormGroup>
              <InputPasswordToggle
                label="New Password"
                htmlFor="new-password"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <InputPasswordToggle
                label="Retype New Password"
                htmlFor="retype-new-password"
                name="retype-new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="mt-1" sm="12">
            <Button.Ripple type="submit" className="mr-1" color="primary">
              Save changes
            </Button.Ripple>
            <Button.Ripple color="secondary" outline>
              Cancel
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PasswordTabContent;
