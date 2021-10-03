// ** React Imports
import { useState, useEffect } from "react";

// ** Custom Components
import Avatar from "@components/avatar";
import { useParams, Link } from "react-router-dom";
import InputPasswordToggle from "@components/input-password-toggle";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import { updateTeacher } from "../../../redux/actions/teacherActions";
import Message from "../../../components/Message";
import { getTeacherDetail } from "../../../redux/actions/teacherActions";
// ** Third Party Components
import { Lock, Edit, Trash2 } from "react-feather";
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup,
  Table,
  CustomInput,
} from "reactstrap";

const UserAccountTab = ({ user: { data } }) => {
  // ** States
  const [img, setImg] = useState(null);
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [role, setRole] = useState(data.role);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch(),
    { id } = useParams();

  // useEffect(() => {
  //   dispatch(getTeacherDetail(id));
  // }, [updateHandler && updateHandler]);

  const teacherUpdate = useSelector((state) => state.teacherUpdate);
  const { loading, error, user } = teacherUpdate;

  // ** Function to change user image
  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // ** Renders User
  const renderUserAvatar = () => {
    if (img === null) {
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
      return (
        <Avatar
          initials
          color={color}
          className="rounded mr-2 my-25"
          content={data && data.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(36px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "90px",
            width: "90px",
          }}
        />
      );
    } else {
      return (
        <img
          className="user-avatar rounded mr-2 my-25 cursor-pointer"
          src={img}
          alt="user profile avatar"
          height="90"
          width="90"
        />
      );
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();

    dispatch(updateTeacher(data && data._id, name, email, password, role));
  };

  const resetAll = () => {
    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          {renderUserAvatar()}
          <Media className="mt-50" body>
            <h4>{data && data.name}</h4>
            <div className="d-flex flex-wrap mt-1 px-0">
              <Button.Ripple
                id="change-img"
                tag={Label}
                className="mr-75 mb-0"
                color="primary"
              >
                <span className="d-none d-sm-block">Change</span>
                <span className="d-block d-sm-none">
                  <Edit size={14} />
                </span>
                <input
                  type="file"
                  hidden
                  id="change-img"
                  onChange={onChange}
                  accept="image/*"
                />
              </Button.Ripple>
            </div>
          </Media>
        </Media>
      </Col>
      <Col sm="12">
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}

        {loading && <Loader />}
        <Form onSubmit={updateHandler} method="put">
          <Row>
            <Col md="6" sm="12">
              <FormGroup>
                <Label for="username">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Fullname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md="6" sm="12">
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  type="select"
                  name="role"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="teacher">Teacher</option>
                  <option value="school">School</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="6" sm="12">
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
            </Col>

            <Col sm="12">
              <div className="permissions border mt-1">
                <h6 className="py-1 mx-1 mb-0 font-medium-2">
                  <Lock size={18} className="mr-25" />
                  <span className="align-middle">Permissions</span>
                </h6>
                <Table borderless striped responsive>
                  <thead className="thead-light">
                    <tr>
                      <th>Module</th>
                      <th>Read</th>
                      <th>Write</th>
                      <th>Create</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Admin</td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="admin-1"
                          label=""
                          defaultChecked
                        />
                      </td>
                      <td>
                        <CustomInput type="checkbox" id="admin-2" label="" />
                      </td>
                      <td>
                        <CustomInput type="checkbox" id="admin-3" label="" />
                      </td>
                      <td>
                        <CustomInput type="checkbox" id="admin-4" label="" />
                      </td>
                    </tr>

                    <tr>
                      <td>Teacher</td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="author-1"
                          label=""
                          defaultChecked
                        />
                      </td>
                      <td>
                        <CustomInput type="checkbox" id="author-2" label="" />
                      </td>
                      <td>
                        <CustomInput
                          type="checkbox"
                          id="author-3"
                          label=""
                          defaultChecked
                        />
                      </td>
                      <td>
                        <CustomInput type="checkbox" id="author-4" label="" />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col className="d-flex flex-sm-row flex-column mt-2" sm="12">
              <Button.Ripple
                className="mb-1 mb-sm-0 mr-0 mr-sm-1"
                type="submit"
                color="primary"
              >
                Save Changes
              </Button.Ripple>
              <Button.Ripple color="secondary" onClick={resetAll} outline>
                Reset
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default UserAccountTab;
