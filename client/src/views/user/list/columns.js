// ** Custom Components
import Avatar from "@components/avatar";
import { deleteTeacher } from "../../../redux/actions/teacherActions";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetail } from "../../../redux/actions/teacherActions";
import { store } from "../../../redux/storeConfig/store";
import { Link } from "react-router-dom";
import { MoreVertical, Edit, FileText, Archive, Trash } from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Vars
const states = [
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "primary",
  "secondary",
];

const stateNum = Math.floor(Math.random() * 6);

// const dispatch = useDispatch();

// const teacherDelete = useSelector((state) => state.teacherDelete);
// const { loading, error } = teacherDelete;

// ** Table Common Column
export const columns = [
  {
    name: "Name",
    selector: "name",
    color: "#666",
    sortable: true,
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.avatar === "" ? (
          <Avatar
            color={`light-${states[stateNum]}`}
            content={row.name}
            initials
          />
        ) : (
          <Avatar
            color={`light-${states[stateNum]}`}
            content={row.name}
            initials
          />
        )}
        <div className="user-info text-truncate ml-1">
          <span className="d-block font-weight-bold text-truncate">
            {row.name}
          </span>
          <small>{row.post}</small>
        </div>
      </div>
    ),
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
    minWidth: "250px",
  },
  {
    name: "Role",
    selector: "role",
    sortable: true,
    minWidth: "150px",
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row) => {
      return (
        <div className="d-flex">
          <UncontrolledDropdown>
            <DropdownToggle className="pr-1" tag="span">
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag={Link}
                to={`/teacher-view/${row._id}`}
                className="w-100"
                onClick={() => store.dispatch(getTeacherDetail(row._id))}
              >
                <FileText size={15} />
                <span className="align-middle ml-50">Details</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="#!"
                className="w-100"
                onClick={() => store.dispatch(deleteTeacher(row._id))}
              >
                <Trash size={15} />
                <span className="align-middle ml-50">Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <Edit size={15} />
        </div>
      );
    },
  },
];
