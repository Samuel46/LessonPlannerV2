// ** React Imports
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// ** Custom Components
import Avatar from "@components/avatar";
import { deleteTeacher } from "../../../redux/actions/teacherActions";
// import Moment from 'react-moment';
// ** Third Party Components
import { Card, CardBody, CardText, Button, Row, Col } from "reactstrap";
import {
  DollarSign,
  TrendingUp,
  User,
  Check,
  Star,
  Flag,
  Phone,
  BookOpen,
  Share2,
} from "react-feather";

const UserInfoCard = () => {
  const teacherDetail = useSelector((state) => state.teacherDetail);
  const { loading, error, user } = teacherDetail;
  const dispatch = useDispatch();

  // ** render user img
  const renderUserImg = () => {
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
        className="rounded"
        content={user && user.data.name}
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
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col
            xl="6"
            lg="12"
            className="d-flex flex-column justify-content-between border-container-lg"
          >
            {error && <Message variant="danger">{error}</Message>}

            {loading && <Loader />}
            <div className="user-avatar-section">
              <div className="d-flex justify-content-start">
                {renderUserImg()}
                <div className="d-flex flex-column ml-1">
                  <div className="user-info mb-1">
                    <h4 className="mb-0">{user && user.data.name}</h4>
                    <CardText tag="span">{user && user.data.email}</CardText>
                  </div>
                  <div className="d-flex flex-wrap align-items-center">
                    <Button.Ripple
                      tag={Link}
                      to={`/teacher-edit/${user && user.data._id}`}
                      color="primary"
                    >
                      Edit
                    </Button.Ripple>
                    {/* <Button.Ripple
                      onClick={() => dispatch(deleteTeacher(user.data._id))}
                      className="ml-1"
                      color="danger"
                      outline
                    >
                      Delete
                    </Button.Ripple> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center user-total-numbers">
              <div className="d-flex align-items-center mr-2">
                <div className="color-box bg-light-primary">
                  <BookOpen className="text-primary" />
                </div>
                <div className="ml-1">
                  <h5 className="mb-0">3</h5>
                  <small>Lessons</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="color-box bg-light-success">
                  <Share2 className="text-success" />
                </div>
                <div className="ml-1">
                  <h5 className="mb-0">9</h5>
                  <small>Shared</small>
                </div>
              </div>
            </div>
          </Col>
          <Col xl="6" lg="12" className="mt-2 mt-xl-0">
            <div className="user-info-wrapper">
              <div className="d-flex flex-wrap align-items-center">
                <div className="user-info-title">
                  <User className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Full Name
                  </CardText>
                </div>
                <CardText className="mb-0">{user && user.data.name}</CardText>
              </div>

              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <Star className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Role
                  </CardText>
                </div>
                <CardText className="text-capitalize mb-0">
                  {user && user.data.role}
                </CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center my-50">
                <div className="user-info-title">
                  <Flag className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Email
                  </CardText>
                </div>
                <CardText className="mb-0">{user && user.data.email}</CardText>
              </div>
              <div className="d-flex flex-wrap align-items-center">
                <div className="user-info-title">
                  <Phone className="mr-1" size={14} />
                  <CardText
                    tag="span"
                    className="user-info-title font-weight-bold mb-0"
                  >
                    Created At
                  </CardText>
                </div>
                <CardText className="mb-0">
                  {user && user.data.createdAt}
                </CardText>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default UserInfoCard;
