/*NOTE: The file that handles the navigation bar for the Tasklist Pages
uses react routing*/

/*TODO: add better styling, add the rest of the pages */

import { Link } from "react-router-dom";

const TaskListNavBar = () => {
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
          <li>
            <Link to="/create-task">Create a Task</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TaskListNavBar;
