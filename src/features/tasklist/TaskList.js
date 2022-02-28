import { React, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  selectCategoryIds,
  selectCategories,
} from "./tasklistPieces/categories/categorySlice";
import { selectFilteredTasks } from "./tasklistPieces/tasks/taskSlice";

import Category from "./tasklistPieces/categories/Category";
import Task from "./tasklistPieces/tasks/Task";

import {
  NoCategories,
  EmptyCategory,
  NoActiveTasks,
  NoCompletedTasks,
} from "./tasklistPieces/TaskListMessages";
import InfoToast from "../../ui/uiPieces/InfoToast";
import { sortArrayById, sortArrayByName } from "../../common/Sorting";

import classes from "./TaskList.module.css";

import { ProgressBar } from "primereact/progressbar";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Card } from "primereact/card";

const TaskList = () => {
  const [success, setSuccess] = useState("idle");
  const [lastUpdate, setLastUpdate] = useState("");
  const [message, setMessage] = useState("");

  const categoryIds = useSelector(selectCategoryIds);
  const categories = useSelector(selectCategories);
  const filteredTasks = useSelector(selectFilteredTasks);
  const categoryLoadingStatus = useSelector((state) => state.categories.status);
  const taskLoadingStatus = useSelector((state) => state.tasks.status);
  const categoryDeletingStatus = useSelector(
    (state) => state.categories.deleted
  );
  const taskDeletingStatus = useSelector((state) => state.tasks.deleted);
  const taskUpdatingStatus = useSelector((state) => state.tasks.updated);
  const categoryUpdatingStatus = useSelector(
    (state) => state.categories.updated
  );
  const filterStatus = useSelector((state) => state.filters.status);

  useEffect(() => {
    if (categoryLoadingStatus === "pending") {
      setLastUpdate("category");
    } else if (taskLoadingStatus === "pending") {
      setLastUpdate("task");
    }
  }, [categoryLoadingStatus, taskLoadingStatus]);

  useEffect(() => {
    if (lastUpdate === "category") {
      if (categoryUpdatingStatus !== "idle") {
        switch (categoryUpdatingStatus) {
          case true:
            setSuccess(true);
            setMessage("Category Updated");
            break;
          case false:
            setSuccess(false);
            setMessage("Update Category Failed");
            break;
          default:
            setSuccess("idle");
        }
      } else if (categoryDeletingStatus !== "idle") {
        switch (categoryDeletingStatus) {
          case true:
            setSuccess(true);
            setMessage("Category Deleted");
            break;
          case false:
            setSuccess(false);
            setMessage("Category Could Not Be Deleted");
            break;
          default:
            setSuccess("idle");
        }
      } else if (
        categoryDeletingStatus === "idle" &&
        categoryUpdatingStatus === "idle"
      ) {
        setSuccess("idle");
      }
    } else if (lastUpdate === "task") {
      if (taskUpdatingStatus !== "idle") {
        switch (taskUpdatingStatus) {
          case true:
            setSuccess(true);
            setMessage("Task Updated");
            break;
          case false:
            setSuccess(false);
            setMessage("Update Task Failed");
            break;
          default:
            setSuccess("idle");
        }
      } else if (taskDeletingStatus !== "idle") {
        switch (taskDeletingStatus) {
          case true:
            setSuccess(true);
            setMessage("Task Deleted");
            break;
          case false:
            setSuccess(false);
            setMessage("Task Could Not Be Deleted");
            break;
          default:
            setSuccess("idle");
        }
      } else if (
        taskDeletingStatus === "idle" &&
        taskUpdatingStatus === "idle"
      ) {
        setSuccess("idle");
      }
    }
  }, [
    lastUpdate,
    taskUpdatingStatus,
    categoryUpdatingStatus,
    taskDeletingStatus,
    categoryDeletingStatus,
  ]);

  let toast =
    success !== "idle" ? (
      <InfoToast success={success} message={message} />
    ) : null;

  if (categoryLoadingStatus === "pending" || taskLoadingStatus === "pending") {
    return (
      <Card title="Loading...">
        <ProgressBar mode="indeterminate" />
      </Card>
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

    const sortedUniqueFilteredCategories = sortArrayById(
      uniqueFilteredCategories
    );
    console.log(sortedUniqueFilteredCategories);

    //since `categories` is an array, we can loop over it
    const renderedTaskListItems = sortedUniqueFilteredCategories.map(
      (categoryId) => {
        //save the current CategoryId into a variable so it can be passed as a foreign key into the tasks
        let noTasksCounter = 0;

        let categoryColor = "white";
        categories.forEach((category) => {
          if (category.id === categoryId) {
            categoryColor = category.color;
          }
        });

        const sortedFilteredTasks = sortArrayByName(filteredTasks);

        const tasks = sortedFilteredTasks.map((task) => {
          if (task.category === categoryId) {
            ++noTasksCounter;
            return (
              <AccordionTab key={task.id} id={task.id} header={task.name}>
                <Task key={task.id} id={task.id} categories={categoryIds} />
              </AccordionTab>
            );
          } else {
            return null;
          }
        });

        let renderedTasks =
          noTasksCounter > 0 ? (
            <Accordion multiple>{tasks}</Accordion>
          ) : (
            <EmptyCategory color={categoryColor} />
          );
        const header = <Category key={categoryId} id={categoryId} />;

        return (
          <div
            key={categoryId}
            id={categoryId}
            style={{
              marginBottom: "2em",
              backgroundColor: "white",
              borderColor: categoryColor,
              width: "100%",
            }}
          >
            {header}
            {renderedTasks}
          </div>
        );
      }
    );
    //no tasks or categories
    if (
      categoryLoadingStatus === "idle" &&
      taskLoadingStatus === "idle" &&
      renderedTaskListItems.length === 0 &&
      filterStatus === "active"
    ) {
      return (
        <Fragment>
          {toast}
          <NoActiveTasks />
        </Fragment>
      );
    } else if (
      categoryLoadingStatus === "idle" &&
      taskLoadingStatus === "idle" &&
      renderedTaskListItems.length === 0 &&
      filterStatus === "completed"
    ) {
      return (
        <Fragment>
          {toast}
          <NoCompletedTasks />
        </Fragment>
      );
    } else if (
      categoryLoadingStatus === "idle" &&
      taskLoadingStatus === "idle" &&
      renderedTaskListItems.length === 0 &&
      filterStatus === "all"
    ) {
      return (
        <Card
          style={{
            marginBottom: "2em",
            width: "100%",
          }}
        >
          {toast}
          <NoCategories />
        </Card>
      );
    } else {
      //existing tasks and categories
      return (
        <ul className={classes.noBullets}>
          {toast}
          {renderedTaskListItems}
        </ul>
      );
    }
  }
};
export default TaskList;
