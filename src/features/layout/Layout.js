/**This file contains the compoonent that handles the overall layout of the pages for now */

/**TODO: as the website becomes more complex, will need to revise this */

import { useState } from "react";

import classes from "./Layout.module.css";
import TaskListNavBar from "./TaskListNavBar";

const Layout = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**TODO: remove when correct logic is added */
  // setIsLoggedIn(false);

  return (
    <div>
      {isLoggedIn ? <TaskListNavBar /> : null}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
