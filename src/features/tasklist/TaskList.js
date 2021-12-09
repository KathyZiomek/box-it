/**This file contains the TaskList component which outputs the components from Tasks.js and Categories.js and passes props to those components */

// import { Fragment } from "react";
import { React } from "react";
import { useSelector } from "react-redux";

import Category from "./categories/Category";
import Task from "./tasks/Task";
import CardTasklist from "../ui/CardTasklist";

import { selectCategoryIds } from "./categories/categorySlice";
import { selectFilteredTasks } from "./tasks/taskSlice";

import classes from "./TaskList.module.css";

import { ProgressSpinner } from "primereact/progressspinner";

//import tasklist messages
import {
  NoCategories,
  EmptyCategory,
  NoActiveTasks,
  NoCompletedTasks,
} from "./TaskListMessages";

const TaskList = () => {
  const categoryIds = useSelector(selectCategoryIds);
  const filteredTasks = useSelector(selectFilteredTasks);
  const categoryLoadingStatus = useSelector((state) => state.categories.status);
  const taskLoadingStatus = useSelector((state) => state.tasks.status);
  const filterStatus = useSelector((state) => state.filters.status);

  if (categoryLoadingStatus === "loading" || taskLoadingStatus === "loading") {
    return (
      <div>
        <ProgressSpinner />
      </div>
    );
  } else {
    /*create a variables to store category ids depending on the current status filter:
    - all categories regardless of tasks (all)
    - categories with tasks that match the current filter (active/completed)
    */
    let uniqueFilteredCategories = [];
    if (filterStatus === "all") {
      uniqueFilteredCategories = categoryIds;
    } else if (filterStatus === "active") {
      const filteredCategories = filteredTasks.map((task) => {
        return task.category;
      });
      //remove duplicates from filteredCategories
      uniqueFilteredCategories = [...new Set(filteredCategories)];
    } else if (filterStatus === "completed") {
      const filteredCategories = filteredTasks.map((task) => {
        return task.category;
      });
      //remove duplicates from filteredCategories
      uniqueFilteredCategories = [...new Set(filteredCategories)];
    }

    //since `categories` is an array, we can loop over it
    const renderedTaskListItems = uniqueFilteredCategories.map((categoryId) => {
      //save the current CategoryId into a variable so it can be passed as a foreign key into the tasks
      let noTasksCounter = 0;

      const tasks = filteredTasks.map((task) => {
        if (task.category === categoryId) {
          ++noTasksCounter;
          return <Task key={task.id} id={task.id} />;
        } else {
          return null;
        }
      });

      let renderedTasks =
        noTasksCounter > 0 ? (
          <ul className={classes.noBullets}>{tasks}</ul>
        ) : (
          <EmptyCategory />
        );
      return (
        <CardTasklist key={categoryId} id={categoryId}>
          <Category key={categoryId} id={categoryId} />
          {renderedTasks}
        </CardTasklist>
      );
    });
    //no tasks or categories
    if (
      categoryLoadingStatus === "idle" &&
      taskLoadingStatus === "idle" &&
      renderedTaskListItems.length === 0 &&
      filterStatus === "active"
    ) {
      return <NoActiveTasks />;
    } else if (
      categoryLoadingStatus === "idle" &&
      taskLoadingStatus === "idle" &&
      renderedTaskListItems.length === 0 &&
      filterStatus === "completed"
    ) {
      return <NoCompletedTasks />;
    } else if (
      categoryLoadingStatus === "idle" &&
      taskLoadingStatus === "idle" &&
      renderedTaskListItems.length === 0 &&
      filterStatus === "all"
    ) {
      return <NoCategories />;
    } else {
      //existing tasks and categories
      return <ul className={classes.noBullets}>{renderedTaskListItems}</ul>;
    }
  }
};
export default TaskList;

// /* TODO: add extra tasklist information (due date, priority level, on-going)
/*/TODO: add extra category information (type, color)*/
