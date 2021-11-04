/**This file contains the TaskList component which outputs the components from Tasks.js and Categories.js and passes props to those components */

// import { Fragment } from "react";
import Task from "./tasks/Task";
import Category from "./categories/Category";
import CardTasklist from "../ui/CardTasklist";

/**Receives props from AllTasks.js page */
function TaskList(props) {
  return (
    <ul>
      {/* maps the information from firebase to a new array that contains all of the category information */}
      {/* TODO: add extra category information (type, color) */}
      {props.tasks.map((category) => (
        <CardTasklist key={category.id} id={category.id}>
          <Category
            key={category.id}
            id={category.id}
            category={category.name}
          />
          <ul>
            {/* nested map that loops through the tasklist data from firebase within each category */}
            {/* TODO: add extra tasklist information (due date, priority level, on-going) */}
            {category.tasklist.map((taskItem, indexItem) => (
              <Task
                key={category.id + "-" + indexItem}
                id={category.id + "-" + indexItem}
                task={taskItem.name}
              />
            ))}
          </ul>
        </CardTasklist>
      ))}
    </ul>
  );
}

export default TaskList;
