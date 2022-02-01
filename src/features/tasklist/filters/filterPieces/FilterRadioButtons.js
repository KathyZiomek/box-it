import { Fragment } from "react";
import { RadioButton } from "primereact/radiobutton";

export const FilterRadioButtons = (props) => {
  let labelValue;

  switch (props.value) {
    case "all":
      labelValue = "All";
      break;
    case "active":
      labelValue = "In Progress";
      break;
    case "completed":
      labelValue = "Complete";
      break;
    default:
    // code block
  }

  return (
    <div
      className="p-field-radiobutton"
      key={props.value}
      style={{ marginLeft: 10, marginRight: 10, marginTop: 0, marginBottom: 0 }}
    >
      <RadioButton
        inputId={props.key}
        value={props.key}
        name="status"
        disabled={props.disabledRadioButton}
        onChange={props.handleClick}
        checked={props.checkedButton}
      />
      <label htmlFor={props.key}>{labelValue}</label>
    </div>
  );
};

export const FilterRadioButtonsStyled = (props) => {
  return (
    <Fragment>
      <div class="p-formgroup-inline">
        <label style={{ marginRight: 25 }}>Filter By Status:</label>
        {props.renderedFilters}
      </div>
    </Fragment>
  );
};
