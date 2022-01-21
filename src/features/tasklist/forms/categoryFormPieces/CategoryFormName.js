import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export const CategoryFormName = (props) => {
  return (
    <div className="p-field">
      <label htmlFor="categoryName">Category Name:</label>
      <InputText
        id="categoryName"
        placeholder={props.placeholder}
        value={props.newCategory}
        onChange={(e) => props.setNewCategory(e.target.value)}
        disabled={props.isLoading}
        onClick={props.handleClick}
        autoComplete="categoryName"
      />
      {props.categoryWarning && (
        <Message severity="error" text="Category cannot be empty" />
      )}
    </div>
  );
};
