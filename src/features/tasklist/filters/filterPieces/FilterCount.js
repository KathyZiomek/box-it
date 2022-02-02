export const FilterCount = (props) => {
  const count = props.tasksRemaining.length;

  // const suffix = count === 1 ? "" : "s";

  return (
    <div className="p-formgroup-inline p-fluid">
      <label style={{ marginRight: 5 }}>Remaining Tasks: </label>
      <label>{count}</label>
    </div>
  );
};
