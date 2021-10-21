function TaskList(props) {
  return (
    <div>
      <h2>{props.category}</h2>
      <hr />
      <p>{props.task}</p>
    </div>
  );
}

export default TaskList;
