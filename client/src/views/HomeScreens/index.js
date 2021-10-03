import { Fragment, useContext, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard";
import { toast, Slide } from "react-toastify";
import Avatar from "@components/avatar";
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import { useDispatch, useSelector } from "react-redux";
import { Coffee } from "react-feather";
import Badge from "reactstrap/lib/Badge";
import Welcome from "./Welcome";
import Stats from "./Stats";
import { getTeacherDetails } from "../../redux/actions/teacherActions";
import { getLessonDetails } from "../../redux/actions/lessonActions";

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Welcome! {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an{" "}
        {role == "school" ? (
          <Badge color="primary" className="badge-glow">
            {role}
          </Badge>
        ) : (
          <Badge color="info" className="badge-glow">
            {role}
          </Badge>
        )}{" "}
        user to Lesson Planner. Now you can start to explore. Enjoy!🎉
      </span>
    </div>
  </Fragment>
);

const EcommerceDashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLessonDetails());
  }, [getLessonDetails]);

  const lessonDetails = useSelector((state) => state.lessonDetails);
  const { loading: lessonLoading, error: lessonError, lessons } = lessonDetails;

  const [userData, setUserData] = useState(null);
  // ** Store Vars
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    dispatch(getTeacherDetails());
  }, []);

  // get login user info
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  // get teachers
  const teacherDetails = useSelector((state) => state.teacherDetails);
  const { loading, error, user: teachers } = teacherDetails;

  // var
  const teacherList = "TeacherList",
    lessonList = "Lesson List";

  useEffect(() => {
    toast.success(
      <ToastContent
        name={(user && user.data?.name) || (userData && userData.data?.name)}
        role={(user && user.data?.role) || (userData && userData.data?.role)}
      />,
      { transition: Slide, hideProgressBar: true, autoClose: 4000 }
    );
  }, []);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="12" md="12" xs="12">
          <Welcome user={user || userData} />
        </Col>
        {(user && user.data?.role === "teacher") ||
        (userData && userData.data?.role === "teacher") ? (
          <Col xl="12" md="12" xs="12">
            <Stats
              teachers={lessons}
              title={lessonList}
              error={lessonError}
              loading={lessonLoading}
            />
          </Col>
        ) : (
          <>
            <Col xl="6" md="6" xs="6">
              <Stats
                teachers={teachers}
                error={error}
                loading={loading}
                title={teacherList}
              />
            </Col>
            <Col xl="6" md="6" xs="6">
              <Stats
                teachers={lessons}
                title={lessonList}
                error={lessonError}
                loading={lessonLoading}
              />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
