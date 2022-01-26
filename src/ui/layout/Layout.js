/**This file contains the compoonent that handles the overall layout of the pages for now */

/**TODO: as the website becomes more complex, will need to revise this */

import { useSelector } from "react-redux";

import { selectUsers } from "../../features/authentication/userSlice";

import classes from "./Layout.module.css";
import NavBar from "./NavBar";

const Layout = (props) => {
  const userCount = useSelector(selectUsers);

  let isLoggedIn =
    userCount.length === 1 && userCount[0].status === "loggedIn" ? true : null;

  return (
    <div>
      {isLoggedIn ? <NavBar /> : null}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
