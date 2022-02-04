import { useDispatch, useSelector } from "react-redux";

import {
  selectCategoryIds,
  categoriesDeleted,
} from "../../../features/tasklist/tasklistPieces/categories/categorySlice";
import {
  selectTaskIds,
  tasksDeleted,
} from "../../../features/tasklist/tasklistPieces/tasks/taskSlice";
import {
  userRemoved,
  selectUserIds,
} from "../../../features/authentication/userSlice";

import { Link } from "react-router-dom";

export const LogoutLink = () => {
  const activeUser = useSelector(selectUserIds);
  const categories = useSelector(selectCategoryIds);
  const tasks = useSelector(selectTaskIds);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(userRemoved(activeUser));
    dispatch(categoriesDeleted(categories));
    dispatch(tasksDeleted(tasks));
  };

  return {
    label: "Logout",
    icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-power-off",
    template: (item, options) => {
      return (
        <Link className={options.className} onClick={onLogout} to="/">
          <span className={(options.iconClassName, item.icon)}></span>
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      );
    },
  };
};
