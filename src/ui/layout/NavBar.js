/** This file will contain the component for the main Navigation Bar of the website */

import { React } from "react";
import { useSelector } from "react-redux";

import { selectCategoryIds } from "../../features/tasklist/tasklistPieces/categories/categorySlice";

import { HomeLink } from "./navBarPieces/HomeLink";
import { ViewAllTasksLink } from "./navBarPieces/ViewAllTasksLink";
import { CreateCategoryLink } from "./navBarPieces/CreateCategoryLink";
import { DeleteAllLink } from "./navBarPieces/DeleteAllLink";
import { CreateTaskLink } from "./navBarPieces/CreateTaskLink";
import { UserSettingsLink } from "./navBarPieces/UserSettingsLink";
import { LogoutLink } from "./navBarPieces/LogoutLink";

import { Menubar } from "primereact/menubar";

const NavBar = () => {
  const categories = useSelector(selectCategoryIds);

  const home = HomeLink();
  const viewAllTasks = ViewAllTasksLink();
  const createCategory = CreateCategoryLink();
  const createTask = CreateTaskLink(categories);
  const deleteAll = DeleteAllLink();
  const userSettings = UserSettingsLink();
  const logout = LogoutLink();
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
  const user = {
    label: "User",
    icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-user",
    items: [
      userSettings,
      {
        separator: true,
      },
      logout,
    ],
  };

  const items = [home, taskList, user];

  const start = <h3>Box It</h3>;

  return (
    <header>
      <nav>
        <div>
          <div className="card">
            <Menubar model={items} start={start} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
