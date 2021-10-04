// ** React Imports
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "@components/spinner/Fallback-spinner";

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserInfoCard from "./UserInfoCard";
import PermissionsTable from "./PermissionsTable";
import Loader from "../../../components/Loader";
import Breadcrumbs from "@components/breadcrumbs";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserView = (props) => {
  // ** Vars
  const teacherDetail = useSelector((state) => state.teacherDetail);
  const { user } = teacherDetail;

  return user && user !== null && user && user !== undefined ? (
    <div className="app-user-view">
      <Breadcrumbs
        breadCrumbTitle="Details"
        breadCrumbParent="View Teacher"
        breadCrumbActive="Details"
      />
      <Row>
        <Col xl="12" lg="12" md="12">
          <UserInfoCard />
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <PermissionsTable />
        </Col>
      </Row>
      <Row></Row>
    </div>
  ) : (
    <Spinner />
  );
};
export default UserView;
