import classes from "./Layout.module.css";
import TasksNavigation from "./TasksNavigation";

function Layout(props) {
  return (
    <div>
      <TasksNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
