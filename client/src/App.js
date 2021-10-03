// ** Router Import
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/actions/userActions";
import Router from "./router/Router";

const App = (props) => <Router />;

export default App;
