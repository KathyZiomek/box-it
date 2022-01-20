import { useSelector } from "react-redux";
import { selectCategories } from "../../categories/categorySlice";
import { Dropdown } from "primereact/dropdown";

export const TaskCategoryDropDown = (props) => {
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
    <div className="p-field p-col-6">
      <label htmlFor="categoryName">Category: </label>
      <Dropdown
        options={categorySelectItems}
        value={props.dropDownCategory}
        disabled={props.isLoading}
        onChange={(e) => {
          props.setDropDownCategory(e.value);
        }}
        onMouseDown={props.handleClick}
      />
    </div>
  );
};
