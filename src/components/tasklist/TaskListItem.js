import Card from "../ui/Card";

function TaskListItem(props) {
  return (
    <li>
      <Card>
        <div>
          <h3>{props.category}</h3>
          <ul>
            <li key={props.id}>{props.tasks}</li>
          </ul>
        </div>
      </Card>
    </li>
  );
}

export default TaskListItem;
