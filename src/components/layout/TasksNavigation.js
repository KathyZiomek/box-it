import { Link } from "react-router-dom";

function TasksNavigation() {
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
}

export default TasksNavigation;
