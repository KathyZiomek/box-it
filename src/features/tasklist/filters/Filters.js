import { Fragment, React, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StatusFilters, statusFilterChanged } from "./filtersSlice";
import {
  deleteTask,
  selectTasks,
  updateTask,
  taskUpdatedCleared,
  taskDeletedCleared,
} from "../tasklistPieces/tasks/taskSlice";
import {
  categoryUpdatedCleared,
  selectCategories,
  categoryDeletedCleared,
} from "../tasklistPieces/categories/categorySlice";

import {
  LeftFilterButton,
  RightFilterButton,
} from "./filterPieces/FilterButtons";
import { FilterCount } from "./filterPieces/FilterCount";
import {
  FilterRadioButtons,
  FilterRadioButtonsStyled,
} from "./filterPieces/FilterRadioButtons";

import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { confirmDialog } from "primereact/confirmdialog";

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
      <li key={value} style={{ listStyle: "none" }}>
        <FilterRadioButtons
          value={value}
          disabledRadioButton={disabledRadioButton}
          handleClick={handleClick}
          checkedButton={checkedButton}
        />
      </li>
    );
  });

  return <FilterRadioButtonsStyled renderedFilters={renderedFilters} />;
};

const Filters = () => {
  const taskErrorStatus = useSelector((state) => state.tasks.error);
  const taskDeletedStatus = useSelector((state) => state.tasks.deleted);
  const categoryErrorStatus = useSelector((state) => state.categories.error);
  const categoryDeletedStatus = useSelector(
    (state) => state.categories.deleted
  );
  const allTasks = useSelector((state) => selectTasks(state));

  const tasksRemaining = useSelector((state) => {
    const uncompletedTasks = selectTasks(state).filter(
      (task) => !task.completed
    );
    return uncompletedTasks;
  });
  const toast = useRef(null);
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.filters);

  const onMarkCompletedClicked = () => {
    //identify tasks that are not currently marked as completed
    //dispatch the action to update their "completed" value in firebase
    if (taskDeletedStatus !== "idle") {
      dispatch(taskDeletedCleared("idle"));
    }
    if (categoryDeletedStatus !== "idle") {
      dispatch(categoryDeletedCleared("idle"));
    }
    tasksRemaining.forEach((task) => {
      let updatedTask = {
        id: task.id,
        completed: true,
      };
      dispatch(updateTask(updatedTask));
    });
  };

  const cancelDelete = () => {
    toast.current.show({
      severity: "info",
      summary: "Delete Canceled",
      life: 1500,
    });
  };

  const confirmDelete = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Deleting Tasks...",
      life: 500,
    });

    const deleteContent = () => {
      if (taskErrorStatus !== "idle") {
        dispatch(taskUpdatedCleared("idle"));
      }
      allTasks.forEach((task) => {
        if (task.completed === true) {
          dispatch(deleteTask(task.id));
        }
      });
    };
    const toastComplete = () => {
      setTimeout(deleteContent, 600);
    };
    toastComplete();
  };

  const confirm = () => {
    confirmDialog({
      message: "Are you sure you want to delete all completed tasks?",
      header: "Warning",
      icon: "pi pi-exclamation-triangle",
      accept: () => confirmDelete(),
      reject: () => cancelDelete(),
    });
  };

  let disabledCompletedButton =
    allTasks.length === 0 || tasksRemaining.length === 0 ? true : false;
  let disabledClearButton =
    allTasks.length === 0 ||
    (tasksRemaining.length !== 0 && allTasks.length === tasksRemaining.length)
      ? true
      : false;

  const onStatusChange = (status) => {
    dispatch(statusFilterChanged(status));

    if (taskErrorStatus !== "idle") {
      dispatch(taskUpdatedCleared("idle"));
    }
    if (categoryErrorStatus !== "idle") {
      dispatch(categoryUpdatedCleared("idle"));
    }
    if (taskDeletedStatus !== "idle") {
      dispatch(taskDeletedCleared("idle"));
    }
    if (categoryDeletedStatus !== "idle") {
      dispatch(categoryDeletedCleared("idle"));
    }
  };

  const toolbarButtons = (
    <Fragment>
      <LeftFilterButton
        onMarkCompletedClicked={onMarkCompletedClicked}
        disabledCompletedButton={disabledCompletedButton}
      />
      <RightFilterButton
        onClearCompletedClicked={confirm}
        disabledClearButton={disabledClearButton}
      />
    </Fragment>
  );

  const toolbarCount = (
    <Fragment>
      <FilterCount tasksRemaining={tasksRemaining} />
    </Fragment>
  );

  const filterByStatus = (
    <Fragment>
      <StatusFilter value={status} onChange={onStatusChange} />
    </Fragment>
  );

  return (
    <Fragment>
      <Toast ref={toast} />
      <Toolbar left={toolbarButtons} right={toolbarCount} />
      <Toolbar left={filterByStatus} style={{ marginBottom: 40 }} />
    </Fragment>
  );
};

export default Filters;
