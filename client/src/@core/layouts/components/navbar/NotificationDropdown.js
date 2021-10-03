// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Bell, X, Check, AlertTriangle, Coffee } from "react-feather";
import {
  Button,
  Badge,
  Media,
  CustomInput,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useSelector } from "react-redux";

const NotificationDropdown = () => {
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const [userData, setUserData] = useState(null);
  // ** Store Vars
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);
  // ** Notification Array
  const notificationsArray = [
    {
      avatarIcon: <X size={14} />,
      color: "light-danger",
      subtitle: "Your email is not confirmed. Please check your inbox.",
      title: (
        <Media tag="p" heading>
          <span className="font-weight-bolder">Email Unverified!</span>
        </Media>
      ),
    },
  ];

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        options={{
          wheelPropagation: false,
        }}
      >
        {notificationsArray.map((item, index) => {
          return (
            <a
              key={index}
              className="d-flex"
              href="/"
              onClick={(e) => e.preventDefault()}
            >
              <Media
                className={classnames("d-flex", {
                  "align-items-start": !item.switch,
                  "align-items-center": item.switch,
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <Media left>
                      <Avatar
                        {...(item.img
                          ? { img: item.img, imgHeight: 32, imgWidth: 32 }
                          : item.avatarContent
                          ? {
                              content: item.avatarContent,
                              color: item.color,
                            }
                          : item.avatarIcon
                          ? {
                              icon: item.avatarIcon,
                              color: item.color,
                            }
                          : null)}
                      />
                    </Media>
                    <Media body>
                      {item.title}
                      <small className="notification-text">
                        {item.subtitle}
                      </small>
                    </Media>
                  </Fragment>
                ) : (
                  <Fragment>
                    {item.title}
                    {item.switch}
                  </Fragment>
                )}
              </Media>
            </a>
          );
        })}
      </PerfectScrollbar>
    );
  };
  /*eslint-enable */

  return (
    <UncontrolledDropdown
      tag="li"
      className="dropdown-notification nav-item mr-25"
    >
      <DropdownToggle
        tag="a"
        className="nav-link"
        href="/"
        onClick={(e) => e.preventDefault()}
      >
        <Bell className="text-primary" size={21} />
        {(user && user.data?.isEmailConfirmed === false) ||
        (userData && userData.data?.isEmailConfirmed === false) ? (
          <Badge pill color="primary" className="badge-up">
            1
          </Badge>
        ) : null}
      </DropdownToggle>
      <DropdownMenu tag="ul" right className="dropdown-menu-media mt-0">
        <li className="dropdown-menu-header">
          <DropdownItem className="d-flex" tag="div" header>
            <h4 className="notification-title mb-0 mr-auto">Notifications</h4>
            {(user && user.data?.isEmailConfirmed === false) ||
            (userData && userData.data?.isEmailConfirmed === false) ? (
              <Badge tag="div" color="light-primary" pill>
                1 New
              </Badge>
            ) : null}
          </DropdownItem>
        </li>
        {(user && user.data?.isEmailConfirmed === false) ||
        (userData && userData.data?.isEmailConfirmed === false) ? (
          renderNotificationItems()
        ) : (
          <Fragment>
            <Media className="d-flex align-items-center ml-2 py-1">
              <Media left>
                <Avatar size="sm" color="info" icon={<Coffee size={14} />} />
              </Media>
              <Media body>
                <small className="notification-text ml-1">
                  No Notifications🎉
                </small>
              </Media>
            </Media>
          </Fragment>
        )}

        <li className="dropdown-menu-footer">
          {/* <Button.Ripple color="primary" block>
            Read all notifications
          </Button.Ripple> */}
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default NotificationDropdown;
