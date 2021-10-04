import classnames from "classnames";
import { useEffect, useState } from "react";
import Avatar from "@components/avatar";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Badge,
  Button,
  Col,
  Row,
} from "reactstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getLessonDetails,
  getLessonDetail,
  deleteLesson,
} from "../../../redux/actions/lessonActions";
import { Plus, Star, Trash, X } from "react-feather";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getTeacherDetails } from "../../../redux/actions/teacherActions";

const CardAppDesign = ({
  day,
  handleTaskSidebar,
  setMainSidebar,
  lessons,
  id,
}) => {
  const dispatch = useDispatch();

  console.log(id, "saa");

  useEffect(() => {
    dispatch(getLessonDetails());
  }, [getLessonDetails]);

  useEffect(() => {
    dispatch(getTeacherDetails());
  }, []);

  // ** Function to selectLesson on click
  const handleTaskClick = (obj) => {
    dispatch(getLessonDetail(obj));
    handleTaskSidebar();
  };

  const [idBtn, setIdBtn] = useState("monday");

  const lessonDetails = useSelector((state) => state.lessonDetails);
  const { loading, error } = lessonDetails;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const teacherDetails = useSelector((state) => state.teacherDetails);
  const { user: teachers } = teacherDetails;

  const handleAddClick = () => {
    handleTaskSidebar();
    setMainSidebar();
  };

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

  const renderLesson =
    lessons &&
    lessons.map((lesson) => {
      return (
        <>
          <Row>
            <Col md="6"></Col>
            <Col md="6">
              <Button.Ripple
                color="lighter-3"
                className="text-left"
                onClick={() => dispatch(deleteLesson(lesson._id))}
              >
                <div className="todo-item-action d-flex align-items-left">
                  <span className="todo-item-favorite cursor-pointer mx-75"></span>

                  <Trash
                    className="cursor-pointer  mb-20 text-danger"
                    size={27}
                    onClick={() => dispatch(deleteLesson(lesson._id))}
                  />
                </div>
              </Button.Ripple>
            </Col>
          </Row>
          <Button.Ripple
            color="bg-gradient-success"
            className="text-left"
            onClick={() => handleTaskClick(lesson._id)}
          >
            <CardTitle className="mt-1 mb-75">Title</CardTitle>
            <CardText className="font-medium-1 mb-2">{lesson.title}</CardText>
            {lesson.description && lesson.description ? (
              <>
                {" "}
                <CardTitle className="mt-1 mb-75">Description</CardTitle>
                <CardText className="font-small-2 mb-2">
                  {lesson.description}
                </CardText>
              </>
            ) : null}

            {lesson.procedures && lesson.procedures ? (
              <>
                <CardTitle className="mt-1 mb-75">Procedure</CardTitle>
                <CardText className="font-small-2 mb-2">
                  {lesson.procedures}
                </CardText>{" "}
              </>
            ) : null}

            {lesson.objective && lesson.objective ? (
              <>
                <CardTitle className="mt-1 mb-75">Objective</CardTitle>
                <CardText className="font-small-2 mb-2">
                  {lesson.objective}
                </CardText>{" "}
              </>
            ) : null}

            {lesson.homework && lesson.homework ? (
              <>
                <CardTitle className="mt-1 mb-75">Homework</CardTitle>
                <CardText className="font-small-2 mb-2">
                  {lesson.homework}
                </CardText>{" "}
              </>
            ) : null}
            {lesson.accommodations && lesson.accommodations ? (
              <>
                <CardTitle className="mt-1 mb-75">accommodations</CardTitle>
                <CardText className="font-small-2 mb-2">
                  {lesson.accommodations}
                </CardText>{" "}
              </>
            ) : null}
          </Button.Ripple>
          {user && user.data.role === "school" ? (
            <>
              <div className="design-group mb-2 pt-50">
                <h6 className="section-label">School/Admin</h6>
                <Badge className="mr-1" color="light-warning">
                  {user.data.name}
                </Badge>
              </div>
            </>
          ) : null}

          <div className="design-group pt-25">
            <h6 className="section-label">Teachers</h6>
            {user && user.data.role === "teacher" ? (
              <Avatar
                initials
                color={color}
                className="rounded mr-2 my-25"
                content={user.data.name}
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
            ) : (
              teachers &&
              teachers &&
              teachers.data.map((teacher) => (
                <Avatar
                  initials
                  color={color}
                  className="rounded mr-2 my-25"
                  content={teacher.name}
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
              ))
            )}
          </div>
          <div className="design-planning-wrapper mb-2 py-75">
            <div className="design-planning">
              <CardText className="mb-25">Created At</CardText>
              <h6 className="mb-0">
                {" "}
                <Moment format="YYYY/MM/DD">{lesson.createdAt}</Moment>
              </h6>
            </div>
            <div className="design-planning">
              <CardText className="mb-25">Due Date</CardText>
              <h6 className="mb-0">
                {" "}
                <Moment format="YYYY/MM/DD">{lesson.dueDate}</Moment>
              </h6>
            </div>
          </div>
        </>
      );
    });

  return (
    <Card className="card-app-design ">
      <CardBody>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Row>
          <Col md="6">
            <Badge color="light-primary">{day}</Badge>
          </Col>
          <Col md="6"></Col>
        </Row>

        {renderLesson}

        <Button.Ripple
          color="primary"
          className="mt-2"
          block
          onClick={handleAddClick}
        >
          <Plus /> Add Lesson
        </Button.Ripple>
      </CardBody>
    </Card>
  );
};

export default CardAppDesign;
