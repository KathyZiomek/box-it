import { Fragment } from "react";
import { Link } from "react-router-dom";

import { Card } from "primereact/card";

//No categories or tasks
export const NoCategories = () => {
  return (
    <Fragment>
      <p>You do not have any existing tasks or categories.</p>
      <p>
        To create some categories, go to{" "}
        <Link to="/create-category">Create a Category</Link>.
      </p>
    </Fragment>
  );
};

//empty categories
//all
export const EmptyCategory = (color) => {
  const categoryColor = color.color;
  return (
    <Card>
      <div style={{ color: categoryColor, padding: "10px", textAlign: "left" }}>
        <p>This category is empty.</p>
        <p>
          To create some tasks, go to{" "}
          <Link to="/create-task">Create a Task</Link>.
        </p>
      </div>
    </Card>
  );
};

//no active tasks
export const NoActiveTasks = () => {
  return (
    <Card>
      <p>You do not have any active tasks.</p>
    </Card>
  );
};

//no completed tasks
export const NoCompletedTasks = () => {
  return (
    <Card>
      <p>You do not have any completed tasks.</p>
    </Card>
  );
};
