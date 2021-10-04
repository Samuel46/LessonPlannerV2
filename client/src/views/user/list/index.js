// ** User List Component
import Table from "./Table";
import { useEffect } from "react";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetails } from "../../../redux/actions/teacherActions";
import Loader from "../../../components/Loader";
import Spinner from "@components/spinner/Fallback-spinner";

import "@styles/react/libs/tables/react-dataTable-component.scss";

const UsersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTeacherDetails());
  }, [loading, user]);

  const teacherDetails = useSelector((state) => state.teacherDetails);
  const { loading, error, user } = teacherDetails;

  console.log(user && user);

  return loading !== false ? (
    <Spinner />
  ) : (
    <div className="app-user-list">
      <Table user={user} />
    </div>
  );
};

export default UsersList;
