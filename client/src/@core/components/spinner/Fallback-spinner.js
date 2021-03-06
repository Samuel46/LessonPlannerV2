// ** Logo
import logo from "@src/assets/images/logo/logo.png";
import { Badge } from "reactstrap";

const SpinnerComponent = () => {
  return (
    <div className="fallback-spinner vh-100">
      <Badge color="primary" className="badge-glow fallback-logo">
        Lesson Planner
      </Badge>

      <div className="loading">
        <div className="effect-1 effects"></div>
        <div className="effect-2 effects"></div>
        <div className="effect-3 effects"></div>
      </div>
    </div>
  );
};

export default SpinnerComponent;
