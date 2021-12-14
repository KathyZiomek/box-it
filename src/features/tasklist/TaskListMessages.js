import classes from "./TaskList.module.css";

//No categories or tasks
export const NoCategories = () => {
  return (
    <div className={classes.noCategories}>
      <p>You do not appear to have any existing tasks or categories.</p>
      <p>
        To create some categories to sort your tasks, click on Create a Category
        in the toolbar on the left.
      </p>
    </div>
  );
};

//empty categories
//all
export const EmptyCategory = () => {
  return (
    <div>
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
    <div>
      <p>You do not appear to have any active tasks.</p>
    </div>
  );
};

//no completed tasks
export const NoCompletedTasks = () => {
  return (
    <div>
      <p>You do not appear to have any completed tasks.</p>
    </div>
  );
};
