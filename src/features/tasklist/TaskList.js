/**This file contains the TaskList component which outputs the components from Tasks.js and Categories.js and passes props to those components */

// import { Fragment } from "react";
import { React } from "react";
import { useSelector } from "react-redux";

import Category from "./categories/Category";
import Task from "./tasks/Task";
import CardTasklist from "../ui/CardTasklist";

import { selectCategoryIds } from "./categories/categorySlice";
import { selectFilteredTaskIds } from "./tasks/taskSlice";

import classes from "./TaskList.module.css";

import { ProgressSpinner } from "primereact/progressspinner";

const TaskList = () => {
  const categoryIds = useSelector(selectCategoryIds);
  const taskIds = useSelector(selectFilteredTaskIds);
  const categoryLoadingStatus = useSelector((state) => state.categories.status);
  const taskLoadingStatus = useSelector((state) => state.tasks.status);

  console.log(categoryLoadingStatus);
  console.log(taskLoadingStatus);

  if (categoryLoadingStatus === "loading" || taskLoadingStatus === "loading") {
    return (
      <div>
        <ProgressSpinner />
      </div>
    );
  } else {
    //since `categories` is an array, we can loop over it
    const renderedTaskListItems = categoryIds.map((categoryId) => {
      //save the current CategoryId into a variable so it can be passed as a foreign key into the tasks
      const currentCategoryId = categoryId;
      return (
        <CardTasklist key={categoryId} id={categoryId}>
          <Category key={categoryId} id={categoryId} />
          <ul className={classes.noBullets}>
            {taskIds.map((taskId) => (
              <Task key={taskId} id={taskId} categoryId={currentCategoryId} />
            ))}
          </ul>
        </CardTasklist>
      );
    });
    //no tasks or categories
    if (
      categoryLoadingStatus === "idle" &&
      taskLoadingStatus === "idle" &&
      renderedTaskListItems.length === 0
    ) {
      return (
        <div>
          <p>You do not appear to have any existing tasks or categories.</p>
          <p>
            To create some categories to sort your tasks, click on Create a
            Category in the toolbar on the left.
          </p>
        </div>
      );
    } else {
      console.log(renderedTaskListItems);
      //existing tasks and categories
      return <ul className={classes.noBullets}>{renderedTaskListItems}</ul>;
    }
  }
};
export default TaskList;

// /* TODO: add extra tasklist information (due date, priority level, on-going)
/*/TODO: add extra category information (type, color)*/
