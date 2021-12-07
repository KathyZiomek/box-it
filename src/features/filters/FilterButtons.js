import { React } from "react";
import { useSelector, useDispatch } from "react-redux";

import { StatusFilters, statusFilterChanged } from "./filtersSlice";
import {
  completedTasksCleared,
  allTasksCompleted,
  selectTasks,
} from "../tasklist/tasks/taskSlice";

import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";
import classes from "../tasklist/TaskList.module.css";
import Card from "../ui/CardTasklist";

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
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key];
    const handleClick = () => onChange(value);

    return (
      <li key={value} className="p-field-radiobutton">
        <RadioButton
          inputId={key}
          value={key}
          name="status"
          onChange={handleClick}
          checked={key.toLowerCase() === status}
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
    return uncompletedTasks.length;
  });

  const { status } = useSelector((state) => state.filters);

  const onMarkCompletedClicked = () => dispatch(allTasksCompleted());
  const onClearCompletedClicked = () => dispatch(completedTasksCleared());

  const onStatusChange = (status) => dispatch(statusFilterChanged(status));

  return (
    <Card>
      <div>
        <h5>Actions</h5>
        <Button onClick={onMarkCompletedClicked}>Mark All Completed</Button>
        <br />
        <Button onClick={onClearCompletedClicked}>Clear Completed</Button>
      </div>

      <div>
        <RemainingTasks count={tasksRemaining} />
      </div>

      <div>
        <StatusFilter value={status} onChange={onStatusChange} />
      </div>
    </Card>
  );
};

export default FilterButtons;
