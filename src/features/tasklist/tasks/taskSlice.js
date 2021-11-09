const initialState = [];

function nextTask(tasks) {
  const maxId = tasks.reduce((maxId, task) => Math.max(task.id, maxId), -1);
  return maxId + 1;
}

//use the initialState as a default value
export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "tasklist/taskAdded": {
      return [
        ...state,
        {
          id: nextTask(state),
          name: action.payload,
        },
      ];
    }
    case "tasklist/updateTaskCategory": {
      const { category, taskId } = action.payload;
      return state.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return {
          ...task,
          category,
        };
      });
    }
    case "tasklist/taskDeleted": {
      return state.filter((task) => task.id !== action.payload);
    }
    default:
      return state;
  }
}
