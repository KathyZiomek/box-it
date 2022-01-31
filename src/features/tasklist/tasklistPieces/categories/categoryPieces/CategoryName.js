import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

export const CategoryName = (props) => {
  return (
    <div className="p-field p-col-6">
      <label htmlFor={props.id}>Name:</label>
      <InputText
        type="text"
        id={props.id}
        value={props.newCategory}
        disabled={props.isLoading}
        onChange={(e) => props.setNewCategory(e.target.value)}
        onClick={props.handleClick}
        autoComplete="categoryName"
      />
      {props.categoryWarning && (
        <Message severity="error" text="Category cannot be empty" />
      )}
    </div>
  );
};
