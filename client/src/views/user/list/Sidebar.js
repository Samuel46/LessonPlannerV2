// ** React Import
import { useState, useEffect } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import InputPasswordToggle from "@components/input-password-toggle";

import { Button, FormGroup, Label, FormText, Form, Input } from "reactstrap";

// ** Store & Actions
import { registerTeacher } from "../../../redux/actions/teacherActions";
import { useDispatch, useSelector } from "react-redux";

const SidebarNewUsers = ({ open, toggleSidebar, history }) => {
  // ** States
  const [role, setRole] = useState("teacher");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  // ** Store Vars
  const dispatch = useDispatch();
  const teacherRegister = useSelector((state) => state.teacherRegister);
  const { loading, error, userInfo } = teacherRegister;

  useEffect(() => {
    if (userInfo) {
      toggleSidebar();
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerTeacher(name, email, password, role));
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Teacher"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      {message && <Message variant="danger">{message}</Message>}
      {error &&
        error &&
        error.map((err) => <Message variant="danger">{err && err}</Message>)}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Label for="full-name">
            Full Name <span className="text-danger">*</span>
          </Label>
          <Input
            name="full-name"
            id="full-name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">
            Email <span className="text-danger">*</span>
          </Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormText color="muted">
            You can use letters, numbers & periods
          </FormText>
        </FormGroup>

        <FormGroup>
          <Label for="email">
            Password <span className="text-danger">*</span>
          </Label>
          <InputPasswordToggle
            type="password"
            name="email"
            id="email"
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
          <Label for="user-role">User Role</Label>
          <Input
            type="select"
            id="user-role"
            name="user-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="teacher">Teacher</option>
            <option value="school">School Admin</option>
          </Input>
        </FormGroup>
        <Button type="submit" className="mr-1" color="primary">
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
