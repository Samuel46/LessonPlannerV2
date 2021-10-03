// ** Reactstrap
import {
  Card,
  CardHeader,
  CardTitle,
  CardText,
  Table,
  CustomInput,
} from "reactstrap";

const PermissionsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Permissions</CardTitle>
      </CardHeader>
      <CardText className="ml-2">Permission according to roles</CardText>
      <Table striped borderless responsive>
        <thead className="thead-light">
          <tr>
            <th>Module</th>
            <th>Read</th>
            <th>Write</th>
            <th>Create</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Teacher</td>
            <td>
              <CustomInput
                type="checkbox"
                id="admin-1"
                label=""
                defaultChecked
                disabled
              />
            </td>
            <td>
              <CustomInput
                type="checkbox"
                defaultChecked
                id="admin-2"
                label=""
                disabled
              />
            </td>
            <td>
              <CustomInput
                type="checkbox"
                id="admin-3"
                defaultChecked
                label=""
                disabled
              />
            </td>
            <td>
              <CustomInput type="checkbox" id="admin-4" label="" disabled />
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default PermissionsTable;
