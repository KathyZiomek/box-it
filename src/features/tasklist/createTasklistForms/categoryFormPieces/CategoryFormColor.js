export const CategoryFormColor = (props) => {
  return (
    <div className="p-field">
      <label style={{ marginRight: 10 }} htmlFor="categoryColor">
        Category Color:
      </label>
      <input
        type="color"
        id="categoryColor"
        value={props.color}
        onClick={props.handleClick}
        onChange={props.handleColorChange}
      />
    </div>
  );
};
