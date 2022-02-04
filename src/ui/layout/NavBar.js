/** This file will contain the component for the main Navigation Bar of the website */
/*TODO: add better styling, add the rest of the pages */

/**TODO: only display this nav bar if a user is signed in */

import { React } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  categoriesDeleted,
  selectCategoryIds,
} from "../../features/tasklist/tasklistPieces/categories/categorySlice";
import {
  tasksDeleted,
  selectTaskIds,
} from "../../features/tasklist/tasklistPieces/tasks/taskSlice";
import {
  userRemoved,
  selectUserIds,
} from "../../features/authentication/userSlice";
import { UIButton } from "../uiPieces/UIButton";

import { Menubar } from "primereact/menubar";
import { HomeLink } from "./navBarPieces/HomeLink";
import { ViewAllTasksLink } from "./navBarPieces/ViewAllTasksLink";
import { CreateCategoryLink } from "./navBarPieces/CreateCategoryLink";
import { DeleteAllLink } from "./navBarPieces/DeleteAllLink";
import { CreateTaskLink } from "./navBarPieces/CreateTaskLink";
import { UserSettingsLink } from "./navBarPieces/UserSettingsLink";

const NavBar = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUserIds);
  const categories = useSelector(selectCategoryIds);
  const tasks = useSelector(selectTaskIds);

  const home = HomeLink();
  const viewAllTasks = ViewAllTasksLink();
  const createCategory = CreateCategoryLink();
  const createTask = CreateTaskLink(categories);
  const deleteAll = DeleteAllLink();
  const userSettings = UserSettingsLink();
  const taskList = {
    label: "Task List",
    icon: "pi-menu-icon pi pi-fw pi-file",
    items: [
      viewAllTasks,
      {
        separator: true,
      },
      createCategory,
      createTask,
      {
        separator: true,
      },
      deleteAll,
    ],
  };

  const items = [home, taskList, userSettings];

  const onLogout = () => {
    dispatch(userRemoved(activeUser));
    dispatch(categoriesDeleted(categories));
    dispatch(tasksDeleted(tasks));
  };

  const start = <h3>Box It</h3>;
  const end = (
    <UIButton
      width="15rem"
      margin={10}
      icon="pi pi-times"
      label="Logout"
      onClick={onLogout}
    />
  );

  return (
    <header>
      <nav>
        <div>
          <div className="card">
            <Menubar model={items} start={start} end={end} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
