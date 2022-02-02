import { UIButton } from "../../../../../ui/uiPieces/UIButton";
import "primeflex/primeflex.css";

export const NotEditingButtons = (props) => {
  return (
    <div className="p-formgroup-inline p-fluid">
      <UIButton
        categoryColor={props.categoryColor}
        width="12rem"
        margin={12}
        icon="pi pi-pencil"
        label="Edit Category"
        isLoading={props.isLoading}
        onClick={props.onEdit}
      />
      <UIButton
        categoryColor={props.categoryColor}
        width="12rem"
        margin={12}
        icon="pi pi-times"
        label="Delete Category"
        isLoading={props.isLoading}
        onClick={props.onDelete}
      />
    </div>
  );
};

export const EditingButtons = (props) => {
  return (
    // <div className="p-formgroup-inline p-fluid">
    <div className="p-d-flex p-jc-between">
      <UIButton
        categoryColor={props.categoryColor}
        width="10rem"
        margin={12}
        icon="pi pi-times"
        label="Reset Color"
        isLoading={props.isLoading}
        onClick={(e) => {
          e.preventDefault();
          props.setNewCategoryColor("#1976D2");
        }}
      />
      <UIButton
        categoryColor={props.categoryColor}
        width="10rem"
        margin={12}
        icon="pi pi-check"
        label="Update"
        isLoading={props.isLoading}
        onClick={props.handleClick}
      />
      <UIButton
        categoryColor={props.categoryColor}
        width="10rem"
        margin={12}
        icon="pi pi-times"
        label="Cancel"
        isLoading={props.isLoading}
        onClick={props.onCancel}
      />
    </div>
  );
};
