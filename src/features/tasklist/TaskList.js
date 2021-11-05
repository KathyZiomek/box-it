/**This file contains the TaskList component which outputs the components from Tasks.js and Categories.js and passes props to those components */

// import { Fragment } from "react";
import React from "react";
import { useSelector } from "react-redux";
// import Task from "./tasks/Task";
import Category from "./categories/Category";
// import CardTasklist from "../ui/CardTasklist";

const selectCategories = (state) => state.categories;

const TaskList = () => {
  const categories = useSelector(selectCategories);

  //since `categories` is an array, we can loop over it
  const renderedTaskListItems = categories.map((category) => {
    return <Category key={category.id} category={category} />;
  });

  return <ul>{renderedTaskListItems}</ul>;

  //commenting out old code - will need to substitute this code with Redux

  //   return (
  //     <ul>
  //       {/* maps the information from firebase to a new array that contains all of the category information */}
  //       {/* TODO: add extra category information (type, color) */}
  //       {props.tasks.map((category) => (
  //         <CardTasklist key={category.id} id={category.id}>
  //           <Category
  //             key={category.id}
  //             id={category.id}
  //             category={category.name}
  //           />
  //           <ul>
  //             {/* nested map that loops through the tasklist data from firebase within each category */}
  //             {/* TODO: add extra tasklist information (due date, priority level, on-going) */}
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
