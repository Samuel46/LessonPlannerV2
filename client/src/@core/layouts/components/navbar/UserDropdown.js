// ** React Imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { isUserLoggedIn } from "@utils";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserDetails } from "../../../../redux/actions/userActions";

// ** Third Party Components
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
  Loader,
} from "react-feather";

const UserDropdown = () => {
  const [userData, setUserData] = useState(null);
  // ** Store Vars
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const renderUserAvatar = () => {
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
        content={
          (user && user && user.data?.name) || (userData && userData.data?.name)
        }
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
    );
  };

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            {!loading && user && user
              ? user.data?.name && user.data?.name
              : userData && userData.data?.name}
          </span>
          <span className="user-status">
            {!loading && user && user
              ? user.data?.role && user.data?.role
              : userData && userData.data?.role}
          </span>
        </div>
        {renderUserAvatar()}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to="/account">
          <User size={14} className="mr-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="#" onClick={(e) => e.preventDefault()}>
          <Mail size={14} className="mr-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={() => dispatch(logout())}>
          <Power size={14} className="mr-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
