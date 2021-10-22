import TaskListItem from "./TaskListItem";

function TaskList(props) {
  return (
    <ul>
      {props.tasks.map((tasks) => (
        <TaskListItem
          key={tasks.id}
          id={tasks.id}
          category={tasks.category}
          tasks={tasks.task}
        />
      ))}
    </ul>
  );
}

export default TaskList;
