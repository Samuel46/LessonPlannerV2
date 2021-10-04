// ** React Imports
import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLesson,
  deleteLesson,
  updateLesson,
} from "../../redux/actions/lessonActions";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

// ** Third Party Components
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import { X, Star, Trash } from "react-feather";
import Select, { components } from "react-select";
import {
  Modal,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
} from "reactstrap";

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

// ** Modal Header
const ModalHeader = (props) => {
  // ** Props
  const { handleTaskSidebar, children, important, setImportant, on } = props;

  // ** Function to delete task
  const handleDeleteTask = () => {};

  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">{children}</h5>
      <div className="todo-item-action d-flex align-items-center">
        <span className="todo-item-favorite cursor-pointer mx-75"></span>
        <X
          className="font-weight-normal mt-25"
          size={16}
          onClick={handleTaskSidebar}
        />
      </div>
    </div>
  );
};

const TaskSidebar = (props) => {
  // ** Props
  const { open, handleTaskSidebar } = props;

  const dispatch = useDispatch();

  // lessonRegister
  const lessonRegister = useSelector((state) => state.lessonRegister);
  const { loading, error } = lessonRegister;
  const lessonDetail = useSelector((state) => state.lessonDetail);
  const { selectedLesson, loading: loadings, error: errors } = lessonDetail;

  // ** Users
  const [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [procedures, setProcedure] = useState(""),
    [objective, setObjective] = useState(""),
    [homework, setHomework] = useState(""),
    [accommodations, setAccommodations] = useState(""),
    [week, setWeek] = useState("monday"),
    [completed, setCompleted] = useState(false),
    [dueDate, setDueDate] = useState(new Date());

  // ** Returns sidebar title
  const handleSidebarTitle = () => {
    if (selectedLesson && selectedLesson && title !== "") {
      return (
        <Button.Ripple
          outline
          size="sm"
          onClick={() => setCompleted(!completed)}
          color={completed === true ? "primary" : "primary"}
        >
          {completed === true ? "Lesson Update" : "Update Lesson"}
        </Button.Ripple>
      );
    } else {
      return "Add Lesson";
    }
  };

  // ** Function to run when sidebar opens
  useEffect(() => {
    setTitle(selectedLesson && selectedLesson.data.title);
    setDescription(selectedLesson && selectedLesson.data.description);
    setProcedure(selectedLesson && selectedLesson.data.procedures);
    setObjective(selectedLesson && selectedLesson.data.objective);
    setHomework(selectedLesson && selectedLesson.data.homework);
    setAccommodations(selectedLesson && selectedLesson.data.accommodations);
    setWeek(selectedLesson && selectedLesson.data.week);
    setDueDate(new Date(selectedLesson && selectedLesson.data.dueDate));
  }, [selectedLesson && selectedLesson]);

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    setDueDate(new Date());
    setTitle("");
    setDescription("");
    setProcedure("");
    setAccommodations("");
    setHomework("");
    setObjective("");
    setWeek("");
  };

  // ** Function to reset fileds
  const handleResetFields = () => {
    setWeek("");
    setDueDate(new Date());
    setTitle("");
    setDescription("");
    setProcedure("");
    setAccommodations("");
    setHomework("");
    setObjective("");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      addLesson(
        title,
        week,
        description,
        objective,
        procedures,
        homework,
        accommodations,
        dueDate
      )
    );

    setDueDate(new Date());
    setTitle("");
    setDescription("");
    setProcedure("");
    setAccommodations("");
    setHomework("");
    setObjective("");
  };

  // update lesson
  const updateHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateLesson(
        selectedLesson && selectedLesson.data._id,
        title,
        week,
        description,
        objective,
        procedures,
        homework,
        accommodations,
        dueDate
      )
    );
    handleTaskSidebar();
  };

  return (
    <Modal
      isOpen={open}
      toggle={handleTaskSidebar}
      className="sidebar-lg"
      contentClassName="p-0"
      onClosed={handleSidebarClosed}
      modalClassName="modal-slide-in sidebar-todo-modal"
    >
      <Form
        id="form-modal-todo"
        className="todo-modal"
        onSubmit={submitHandler}
        method="post"
      >
        <ModalHeader handleTaskSidebar={handleTaskSidebar}>
          {handleSidebarTitle()}
        </ModalHeader>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          {error &&
            error &&
            error.map((err) => (
              <Message variant="danger">{err && err}</Message>
            ))}

          {loading && <Loader />}
          {errors && <Message variant="danger">{errors}</Message>}
          {loadings && <Loader />}
          <FormGroup>
            <Label className="form-label" for="task-title">
              Title <span className="text-danger">*</span>
            </Label>
            <Input
              id="task-title"
              value={title}
              placeholder="Title"
              className="new-todo-item-title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label className="form-label" for="due-date">
              Due Date
            </Label>
            <Flatpickr
              id="due-date"
              name="due-date"
              className="form-control"
              onChange={(date) => setDueDate(date[0])}
              value={dueDate}
              options={{ dateFormat: "Y-m-d" }}
            />
          </FormGroup>
          <FormGroup>
            <Label className="form-label" for="task-assignee">
              Day <span className="text-danger">*</span>
            </Label>
            <Input
              type="select"
              className="react-select"
              classNamePrefix="select"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thurday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="task-desc" className="form-label">
              Description <span className="text-danger">*</span>
            </Label>

            <Input
              type="textarea"
              value={description}
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="task-desc" className="form-label">
              Objectives
            </Label>
            <Input
              type="textarea"
              value={objective}
              className="form-control"
              onChange={(e) => setObjective(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="task-desc" className="form-label">
              Procedures
            </Label>
            <Input
              type="textarea"
              className="form-control"
              value={procedures}
              onChange={(e) => setProcedure(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="task-desc" className="form-label">
              Homework
            </Label>
            <Input
              type="textarea"
              value={homework}
              className="form-control"
              onChange={(e) => setHomework(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="task-desc" className="form-label">
              Accomodations
            </Label>
            <Input
              className="form-control"
              type="textarea"
              value={accommodations}
              onChange={(e) => setAccommodations(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            {selectedLesson && selectedLesson ? (
              <Fragment>
                <Button
                  color="primary"
                  className="update-btn update-todo-item mr-1"
                  onClick={updateHandler}
                >
                  Update
                </Button>
                <Button color="secondary" onClick={handleResetFields} outline>
                  Reset
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button
                  color="primary"
                  className="add-todo-item mr-1"
                  type="submit"
                >
                  Add
                </Button>
                <Button color="secondary" onClick={handleTaskSidebar} outline>
                  Cancel
                </Button>
              </Fragment>
            )}
          </FormGroup>
        </ModalBody>
      </Form>
    </Modal>
  );
};

export default TaskSidebar;
