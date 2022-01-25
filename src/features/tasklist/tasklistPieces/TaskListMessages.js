import { Fragment } from "react";

import { Card } from "primereact/card";

//No categories or tasks
export const NoCategories = () => {
  return (
    <Fragment>
      <p>You do not appear to have any existing tasks or categories.</p>
      <p>
        To create some categories to sort your tasks, click on Create a Category
        in the toolbar on the left.
      </p>
    </Fragment>
  );
};

//empty categories
//all
export const EmptyCategory = (color) => {
  const categoryColor = color.color;
  return (
    <div style={{ color: categoryColor, padding: "10px", textAlign: "left" }}>
      <p>This category is empty.</p>
      <p>
        Go to "Create a Task" in order to create some tasks to populate this
        category.
      </p>
    </div>
  );
};

//no active tasks
export const NoActiveTasks = () => {
  return (
    <Card>
      <p>You do not appear to have any active tasks.</p>
    </Card>
  );
};

//no completed tasks
export const NoCompletedTasks = () => {
  return (
    <Card>
      <p>You do not appear to have any completed tasks.</p>
    </Card>
  );
};
