export const CategoryColor = (props) => {
  return (
    <div className="p-field">
      <label style={{ marginRight: 10 }} htmlFor="categoryColor">
        Color:
      </label>
      <input
        type="color"
        id="categoryColor"
        value={props.color}
        onClick={props.handleClick}
        onChange={(e) => props.setNewCategoryColor(e.target.value)}
      />
    </div>
  );
};
