/**This component outputs a single task list item - receives props from TaskList.js */
import { React, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteTask, selectTaskById, updateTask } from "./taskSlice";
import { selectCategoryById } from "../categories/categorySlice";

import CategoryDropDown from "../forms/CategoryDropDown";
import DisplayDate from "./../../../common/DisplayDate";

import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Calendar } from "primereact/calendar";

const Task = ({ id }) => {
  //call our `selectTaskById` with the state _and_ the ID value
  const filterStatus = useSelector((state) => state.filters.status);
  const task = useSelector((state) => selectTaskById(state, id));

  const { name, category, duedate, completed } = task;
  const categoryColor = useSelector(
    (state) => selectCategoryById(state, category).color
  );

  const [status, setStatus] = useState("idle");
  const [isToggled, setToggled] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [filter, setFilter] = useState("all");
  const [newDuedate, setNewDueDate] = useState("");
  const dispatch = useDispatch();

  const taskInputRef = useRef();
  const categoryInputRef = useRef();
  // const duedateInputRef = useRef();

  if (filterStatus !== filter) {
    setFilter(filterStatus);
    setEditing(false);
    setToggled(false);
  }

  // create the category drop down
  // since `categories` is an array, we can loop over it
  // const renderedCategoryItems = categories.map((categoryId) => {
  //   return <CategoryDropDown key={categoryId} id={categoryId} />;
  // });

  const onDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const onEdit = (event) => {
    event.preventDefault();
    !isEditing ? setEditing(true) : setEditing(false);
  };

  const updateHandler = (event) => {
    event.preventDefault();

    const enteredTask = taskInputRef.current.value;
    const enteredCategory = categoryInputRef.current.props.value;

    const enteredDueDate = newDuedate;
    const trimmedTask = enteredTask.trim();
    const trimmedCategory = enteredCategory.trim();

    let text = {
      id: task.id,
      ...(trimmedTask !== task.name && { name: trimmedTask }),
      ...(enteredDueDate !== task.duedate && { duedate: enteredDueDate }),
      ...(trimmedCategory !== task.category && { category: trimmedCategory }),
    };

    if (
      text.name === undefined &&
      text.duedate === undefined &&
      text.category === undefined
    ) {
      setEditing(false);
    } else {
      setStatus("loading");
      dispatch(updateTask(text));
      setStatus("idle");
      setEditing(false);
    }
  };

  const handleToggled = () => {
    isToggled ? setToggled(false) : setToggled(true);
  };

  const handleCheckboxChanged = (event) => {
    const text = {
      id: task.id,
      completed: event.checked,
    };
    dispatch(updateTask(text));
  };

  let displayDate = DisplayDate(duedate);

  let duedateComponent = duedate ? <p>Due Date: {displayDate}</p> : null;

  let startDate = new Date("01-01-2022");
  let endDate = new Date("01-01-2023");
  let currentDate = new Date(duedate);

  let toggle = isToggled ? (
    <div>
      {duedateComponent}
      <Button
        style={{ border: categoryColor, background: categoryColor }}
        onClick={onEdit}
      >
        Edit Task
      </Button>
      <Button
        style={{ border: categoryColor, background: categoryColor }}
        onClick={onDelete}
      >
        Delete Task
      </Button>
      <hr />
    </div>
  ) : null;

  let taskAppearance = !isEditing ? (
    <li id={task.id} className={"p-field-checkbox"}>
      <Checkbox
        inputId={task.id}
        name="task"
        value={name}
        checked={completed}
        onChange={handleCheckboxChanged}
      />
      <label
        htmlFor={task.id}
        onClick={handleToggled}
        style={{ color: categoryColor }}
      >
        {name}
        {toggle}
      </label>
    </li>
  ) : (
    <form onSubmit={updateHandler}>
      <li id={task.id} className="p-field-checkbox">
        <hr />
        <div>
          <InputText id={task.id} defaultValue={name} ref={taskInputRef} />
        </div>
        <div>
          <label htmlFor="duedate">Due Date: </label>
          <Calendar
            id="duedate"
            name="duedate"
            minDate={startDate}
            maxDate={endDate}
            value={currentDate}
            viewDate={currentDate}
            onChange={(e) => {
              setNewDueDate(e.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category: </label>
          <CategoryDropDown ref={categoryInputRef} />
        </div>
        <div>
          <Button style={{ border: categoryColor, background: categoryColor }}>
            Update Task
          </Button>
          <Button
            style={{ border: categoryColor, background: categoryColor }}
            onClick={onEdit}
          >
            Cancel
          </Button>
        </div>
        <hr />
      </li>
    </form>
  );

  let isLoading = status === "loading";
  let loader = isLoading ? (
    <div>
      <ProgressSpinner />
    </div>
  ) : null;

  return (
    <div>
      {taskAppearance}
      {loader}
      <br />
    </div>
  );
};

export default Task;

/**TODO: update the styling for the component */
