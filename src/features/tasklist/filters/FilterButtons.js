import { Fragment, React, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StatusFilters, statusFilterChanged } from "./filtersSlice";
import {
  // completedTasksCleared,
  deleteTask,
  // allTasksCompleted,
  selectTasks,
  updateTask,
} from "../tasklistPieces/tasks/taskSlice";
import { selectCategories } from "../tasklistPieces/categories/categorySlice";

import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
// import { SplitButton } from "primereact/splitbutton";

const RemainingTasks = ({ count }) => {
  const suffix = count === 1 ? "" : "s";

  return (
    <div className="p-formgroup-inline p-fluid">
      <label style={{ marginRight: 5 }}>Remaining Tasks: </label>
      <label>
        {count} item{suffix} left
      </label>
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
      <div
        key={value}
        className="p-field"
        style={{ marginLeft: 10, marginRight: 10 }}
      >
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
      </div>
    );
  });

  return (
    <Fragment>
      <div className="p-formgroup-inline p-fluid">
        <label style={{ marginRight: 25 }}>Filter By Status</label>
        {/* <ul className={classes.noBullets}>{renderedFilters}</ul> */}
        {renderedFilters}
      </div>
    </Fragment>
  );
};

const FilterButtons = () => {
  const toast = useRef(null);
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
      let updatedTask = {
        id: task.id,
        completed: true,
      };
      dispatch(updateTask(updatedTask));
    });
  };

  //get all current tasks
  const allTasks = useSelector((state) => selectTasks(state));
  const onClearCompletedClicked = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Completed Tasks Cleared",
      life: 800,
    });

    const deleteContent = () => {
      allTasks.forEach((task) => {
        if (task.completed === true) {
          dispatch(deleteTask(task.id));
        }
      });
    };
    const toastComplete = () => {
      setTimeout(deleteContent, 500);
    };
    toastComplete();
  };

  let disabledButtons = allTasks.length === 0 ? true : false;

  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  const toolbarButtons = (
    <div className="p-formgroup-inline p-fluid">
      <div className="p-field">
        <Button
          label="Mark All Completed"
          icon="pi pi-check"
          onClick={onMarkCompletedClicked}
          disabled={disabledButtons}
        />
      </div>
      <div className="p-field">
        <Button
          label="Clear Completed"
          icon="pi pi-times"
          onClick={onClearCompletedClicked}
          disabled={disabledButtons}
        />
      </div>
    </div>
  );

  const toolbarCount = (
    <Fragment>
      {/* <i className="pi pi-bars p-toolbar-separator mr-2" /> */}
      <RemainingTasks count={tasksRemainingCounter} />
    </Fragment>
  );

  const other = (
    <Fragment>
      {/* <i className="pi pi-bars p-toolbar-separator mr-2" /> */}
      <StatusFilter value={status} onChange={onStatusChange} />
    </Fragment>
  );

  return (
    <Fragment>
      <Toast ref={toast} />
      <Toolbar left={toolbarButtons} right={toolbarCount} />
      <Toolbar left={toolbarCount} />
      <Toolbar left={other} />
      {/* <Card
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
      </Card> */}
    </Fragment>
  );
};

export default FilterButtons;
