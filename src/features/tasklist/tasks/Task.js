/**This component outputs a single task list item - receives props from TaskList.js */

/**TODO: add extra task information (due date, priority, on-going) that outputs when clicking on the task*/
/**TODO: add functionality to the task to allow it to be clicked and dismissed/deleted from Firebase */
const Task = (props) => {
  return <li id={props.id}>{props.task}</li>;
};

export default Task;
