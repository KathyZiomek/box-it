/**This file contains the TaskList component which outputs the components from Tasks.js and Categories.js and passes props to those components */

// import { Fragment } from "react";
import React from "react";
import { useSelector, shallowEqual } from "react-redux";
// import Task from "./tasks/Task";
import Category from "./categories/Category";
import Task from "./tasks/Task";
import CardTasklist from "../ui/CardTasklist";

const selectCategoryIds = (state) =>
  state.categories.map((category) => category.id);
const selectTaskIds = (state) => state.tasks.map((task) => task.id);

const TaskList = () => {
  const categoryIds = useSelector(selectCategoryIds, shallowEqual);

  const taskIds = useSelector(selectTaskIds, shallowEqual);

  //since `categories` is an array, we can loop over it
  const renderedTaskListItems = categoryIds.map((categoryId) => {
    //save the current CategoryId into a variable so it can be passed as a foreign key into the tasks
    const currentCategoryId = categoryId;
    return (
      <CardTasklist key={categoryId} id={categoryId}>
        <Category key={categoryId} id={categoryId} />
        <ul>
          {taskIds.map((taskId) => (
            <Task key={taskId} id={taskId} categoryId={currentCategoryId} />
          ))}
        </ul>
      </CardTasklist>
    );
  });

  return <ul>{renderedTaskListItems}</ul>;

  //commenting out old code - will need to substitute this code with Redux

  //   return (
  //     <ul>
  //       {/* maps the information from firebase to a new array that contains all of the category information */}
  //
  //       {props.tasks.map((category) => (
  //         <CardTasklist key={category.id} id={category.id}>
  //           <Category
  //             key={category.id}
  //             id={category.id}
  //             category={category.name}
  //           />
  //           <ul>
  //             {/* nested map that loops through the tasklist data from firebase within each category */}
  //
  //             {category.tasklist.map((taskItem, indexItem) => (
  //               <Task
  //                 key={category.id + "-" + indexItem}
  //                 id={category.id + "-" + indexItem}
  //                 task={taskItem.name}
  //               />
  //             ))}
  //           </ul>
  //         </CardTasklist>
  //       ))}
  //     </ul>
  //   );
  // };
};
export default TaskList;

//TODO: add logic to output the correct task items under the correct category
// /* TODO: add extra tasklist information (due date, priority level, on-going)
/*/TODO: add extra category information (type, color)*/
