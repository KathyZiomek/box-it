import { useSelector } from "react-redux";

import { selectCategories } from "../../categories/categorySlice";

import { Dropdown } from "primereact/dropdown";
import { Message } from "primereact/message";

export const TaskFormCategory = (props) => {
  const categories = useSelector(selectCategories);

  let categorySelectItems = null;
  categorySelectItems = categories.map((category) => {
    if (categorySelectItems === null) {
      return { label: category.name, value: category.id };
    } else {
      return {
        ...categorySelectItems,
        label: category.name,
        value: category.id,
      };
    }
  });

  return (
    <div className="p-field">
      <label htmlFor="categoryName">Category Name:</label>
      <Dropdown
        options={categorySelectItems}
        placeholder="Select a Category"
        value={props.category}
        disabled={props.isLoading}
        onChange={(e) => {
          props.setCategory(e.value);
        }}
        onMouseDown={props.handleClick}
      />
      {props.categoryWarning && (
        <Message severity="error" text="Must select a category" />
      )}
    </div>
  );
};
