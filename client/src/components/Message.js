import React, { useState } from "react";
import { Fragment } from "react";
import Avatar from "@components/avatar";
import { X } from "react-feather";
import { UncontrolledAlert } from "reactstrap";
const Message = ({ variant, children }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Fragment>
      <UncontrolledAlert color={variant}>
        <div className="alert-body">👋{children}</div>
      </UncontrolledAlert>
    </Fragment>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
