import { Fragment } from "react";
import { Link } from "react-router-dom";

import { Card } from "primereact/card";
import { Button } from "primereact/button";

//No categories or tasks
export const NoCategories = () => {
  return (
    <Fragment>
      <p>You do not have any existing tasks or categories.</p>
      <p>
        To create some categories, click here: <br />
        <Link
          to="/create-category"
          style={{ textDecoration: "none", margin: 0, padding: 0 }}
        >
          <Button
            style={{
              width: "15rem",
              marginTop: 15,
            }}
            icon="pi pi-plus"
            label="Create a Category"
          ></Button>
        </Link>
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
        This category is empty. To create some tasks, click here:
        <br />
        <Link to="/create-task" style={{ textDecoration: "none" }}>
          <Button
            style={{
              border: categoryColor,
              background: categoryColor,
              width: "15rem",
              marginTop: 15,
            }}
            icon="pi pi-plus"
            label="Create a Task"
          ></Button>
        </Link>
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
