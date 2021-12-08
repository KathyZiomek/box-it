/*NOTE: The file that handles the navigation bar for the Tasklist Pages
uses react routing*/

/*TODO: add better styling, add the rest of the pages */

import { React } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCategoryIds } from "../tasklist/categories/categorySlice";

const TaskListNavBar = () => {
  const categoryCount = useSelector(selectCategoryIds);

  let createTaskPage =
    categoryCount.length > 0 ? (
      <li>
        <Link to="/create-task">Create a Task</Link>
      </li>
    ) : null;

  return (
    <header>
      <div>Box It</div>
      <nav>
        <ul>
          <li>
            <Link to="/">View All Tasks</Link>
          </li>
          <li>
            <Link to="/create-category">Create a Category</Link>
          </li>
          {createTaskPage}
        </ul>
      </nav>
    </header>
  );
};

export default TaskListNavBar;
