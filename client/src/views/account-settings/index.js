import { Fragment, useState, useEffect } from "react";
import Tabs from "./Tabs";
import InfoTabContent from "./InfoTabContent";
import Breadcrumbs from "@components/breadcrumbs";
import GeneralTabContent from "./GeneralTabContent";
import PasswordTabContent from "./PasswordTabContent";
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/pages/page-account-settings.scss";
import Spinner from "reactstrap/lib/Spinner";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const [activeTab, setActiveTab] = useState("1"),
    [data, setData] = useState(null);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return loading !== false ? (
    <Spinner />
  ) : (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Account Settings"
        breadCrumbParent="Account Settings"
        breadCrumbActive="Account Settings"
      />

      <Row>
        <Col className="mb-2 mb-md-0" md="3">
          <Tabs activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
        <Col md="9">
          <Card>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <GeneralTabContent
                    loading={loading}
                    error={error}
                    user={user}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <PasswordTabContent
                    user={user}
                    loading={loading}
                    error={error}
                  />
                </TabPane>
                <TabPane tabId="3">
                  <InfoTabContent user={user} />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AccountSettings;
