// ** React Imports
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "@components/breadcrumbs";
// ** User Edit Components

import AccountTab from "./Account";

import Message from "../../../components/Message";
import Loader from "../../../components/Loader";

// ** Store & Actions
import { getTeacherDetail } from "../../../redux/actions/teacherActions";
import { useSelector, useDispatch } from "react-redux";

// ** Third Party Components
import { User, Info, Share2 } from "react-feather";
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Alert,
} from "reactstrap";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserEdit = () => {
  // ** States & Vars
  const [activeTab, setActiveTab] = useState("1"),
    dispatch = useDispatch(),
    { id } = useParams();

  // ** Function to toggle tabs
  const toggle = (tab) => setActiveTab(tab);

  // ** Function to get user on mount
  useEffect(() => {
    dispatch(getTeacherDetail(id));
  }, [dispatch, id]);

  const teacherDetail = useSelector((state) => state.teacherDetail);
  const { loading, error, user } = teacherDetail;

  return user !== null && user !== undefined ? (
    <>
      <Breadcrumbs
        breadCrumbTitle="Account"
        breadCrumbParent="Edit Teacher"
        breadCrumbActive="Account"
      />
      <Row className="app-user-edit">
        <Col sm="12">
          <Card>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <CardBody className="pt-2">
              <Nav pills>
                <NavItem>
                  <NavLink
                    active={activeTab === "1"}
                    onClick={() => toggle("1")}
                  >
                    <User size={14} />
                    <span className="align-middle d-none d-sm-block">
                      Account
                    </span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <AccountTab user={user} />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  ) : (
    <Loader />
  );
};
export default UserEdit;
