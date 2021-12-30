import { React } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StatusFilters, statusFilterChanged } from "./filtersSlice";
import {
  // completedTasksCleared,
  deleteTask,
  // allTasksCompleted,
  selectTasks,
  updateTask,
} from "../tasklist/tasks/taskSlice";
import { selectCategories } from "../tasklist/categories/categorySlice";

import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import classes from "../tasklist/TaskList.module.css";
// import Card from "../ui/CardTasklist";
import { Card } from "primereact/card";

const RemainingTasks = ({ count }) => {
  const suffix = count === 1 ? "" : "s";

  return (
    <div>
      <p>Remaining Tasks</p>
      <p>
        {count} item{suffix} left
      </p>
    </div>
  );
};

const StatusFilter = ({ value: status, onChange }) => {
  const dispatch = useDispatch();
  //identify if there are no existing tasks or categories to disable the radio buttons
  const categoryCount = useSelector(selectCategories);
  let disabledRadioButton = categoryCount.length > 0 ? false : true;

  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    let checkedButton = false;
    if (
      key.toLowerCase() === status &&
      status === "all" &&
      disabledRadioButton
    ) {
      checkedButton = true;
    } else if (key.toLowerCase() === status && !disabledRadioButton) {
      checkedButton = true;
    } else if (
      disabledRadioButton &&
      key.toLowerCase() !== status &&
      key.toLowerCase() === "all"
    ) {
      checkedButton = true;
      dispatch(statusFilterChanged(key.toLowerCase()));
    } else {
      checkedButton = false;
    }

    const value = StatusFilters[key];
    const handleClick = () => onChange(value);

    return (
      <li key={value} className="p-field-radiobutton">
        <RadioButton
          inputId={key}
          value={key}
          name="status"
          disabled={disabledRadioButton}
          onChange={handleClick}
          checked={checkedButton}
        />
        <label htmlFor={key}>{key}</label>
      </li>
    );
  });

  return (
    <div>
      <h5>Filter By Status</h5>
      <ul className={classes.noBullets}>{renderedFilters}</ul>
    </div>
  );
};

const FilterButtons = () => {
  const dispatch = useDispatch();

  const tasksRemaining = useSelector((state) => {
    const uncompletedTasks = selectTasks(state).filter(
      (task) => !task.completed
    );
    return uncompletedTasks;
  });
  const tasksRemainingCounter = tasksRemaining.length;

  const { status } = useSelector((state) => state.filters);

  const onMarkCompletedClicked = () => {
    //identify tasks that are not currently marked as completed
    //dispatch the action to update their "completed" value in firebase
    tasksRemaining.forEach((task) => {
      let text = {
        id: task.id,
        completed: true,
      };
      dispatch(updateTask(text));
    });
  };

  //get all current tasks
  const allTasks = useSelector((state) => selectTasks(state));
  const onClearCompletedClicked = () => {
    allTasks.forEach((task) => {
      if (task.completed === true) {
        dispatch(deleteTask(task.id));
      }
    });
  };

  let disabledButtons = allTasks.length === 0 ? true : false;

  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  return (
    <Card
      header={
        <div style={{ margin: 0, background: "#1976D2" }}>
          <br />
        </div>
      }
    >
      <h2>Actions</h2>
      <div style={{ padding: 5 }}>
        <Button onClick={onMarkCompletedClicked} disabled={disabledButtons}>
          Mark All Completed
        </Button>
        <br />
        <Button onClick={onClearCompletedClicked} disabled={disabledButtons}>
          Clear Completed
        </Button>
      </div>

      <div style={{ padding: 5 }}>
        <RemainingTasks count={tasksRemainingCounter} />
      </div>

      <div style={{ padding: 5 }}>
        <StatusFilter value={status} onChange={onStatusChange} />
      </div>
    </Card>
  );
};

export default FilterButtons;
