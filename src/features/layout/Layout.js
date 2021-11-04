/**This file contains the compoonent that handles the overall layout of the pages for now */

/**TODO: as the website becomes more complex, will need to revise this */

import classes from "./Layout.module.css";
import TaskListNavBar from "./TaskListNavBar";

function Layout(props) {
  return (
    <div>
      <TaskListNavBar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
