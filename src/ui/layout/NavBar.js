/** This file will contain the component for the main Navigation Bar of the website */
/*TODO: add better styling, add the rest of the pages */

/**TODO: only display this nav bar if a user is signed in */

import { React } from "react";
import { Link } from "react-router-dom";
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
import { AuthButton } from "../../features/authentication/authPieces/AuthButton";

import { Menubar } from "primereact/menubar";

const NavBar = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector(selectUserIds);
  const categories = useSelector(selectCategoryIds);
  const tasks = useSelector(selectTaskIds);

  const items = [
    {
      label: "Home",
      icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-home",
      template: (item, options) => {
        return (
          <Link className={options.className} to="/">
            <span className={(options.iconClassName, item.icon)}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Task List",
      icon: "pi-menu-icon pi pi-fw pi-file",
      items: [
        {
          label: "View All Tasks",
          icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-external-link",
          template: (item, options) => {
            return (
              <Link className={options.className} to="/tasklist">
                <span className={(options.iconClassName, item.icon)}></span>
                <span className={options.labelClassName}>{item.label}</span>
              </Link>
            );
          },
        },
        {
          separator: true,
        },
        {
          label: "Create a Category",
          icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-plus",
          template: (item, options) => {
            return (
              <Link className={options.className} to="/create-category">
                <span className={(options.iconClassName, item.icon)}></span>
                <span className={options.labelClassName}>{item.label}</span>
              </Link>
            );
          },
        },
        {
          ...(categories.length > 0 && {
            label: "Create a Task",
            icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-plus",
            template: (item, options) => {
              return (
                <Link className={options.className} to="/create-task">
                  <span className={(options.iconClassName, item.icon)}></span>
                  <span className={options.labelClassName}>{item.label}</span>
                </Link>
              );
            },
          }),
        },
        {
          separator: true,
        },
        {
          label: "Delete All",
          icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-trash",
          template: (item, options) => {
            return (
              <Link className={options.className} to="/delete-all">
                <span className={(options.iconClassName, item.icon)}></span>
                <span className={options.labelClassName}>{item.label}</span>
              </Link>
            );
          },
        },
      ],
    },

    {
      label: "User Settings",
      icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-user",
      template: (item, options) => {
        return (
          <Link className={options.className} to="/user-settings">
            <span className={(options.iconClassName, item.icon)}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
  ];

  const onLogout = () => {
    dispatch(userRemoved(activeUser));
    dispatch(categoriesDeleted(categories));
    dispatch(tasksDeleted(tasks));
  };

  const start = <h3>Box It</h3>;
  const end = (
    <AuthButton icon="pi pi-times" label="Logout" handleClick={onLogout} />
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
