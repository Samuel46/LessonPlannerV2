// ** React Imports
import { Fragment, useState, useEffect } from "react";
import TaskSidebar from "./TaskSidebar";

// ** Store & Actions
import Cards from "./swiper";
// ** Styles
import "@styles/react/apps/app-todo.scss";

const TODO = () => {
  // ** States

  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");
  const [mainSidebar, setMainSidebar] = useState(false);
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar);
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);

  return (
    <Fragment>
      <div>
        <div className="content-wrapper">
          <div className="content-body">
            <div onClick={handleMainSidebar}></div>

            <TaskSidebar
              open={openTaskSidebar}
              handleTaskSidebar={handleTaskSidebar}
            />
            <Cards
              open={openTaskSidebar}
              handleTaskSidebar={handleTaskSidebar}
              mainSidebar={mainSidebar}
              setMainSidebar={setMainSidebar}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TODO;
