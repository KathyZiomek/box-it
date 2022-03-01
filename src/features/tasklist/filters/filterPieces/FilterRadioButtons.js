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
      id={props.value}
      disabled={props.disabledRadioButton}
      style={{ marginLeft: 10, marginRight: 10, marginTop: 0, marginBottom: 0 }}
    >
      <RadioButton
        key={props.value}
        id={props.value}
        inputId={props.value}
        value={props.value}
        name="status"
        disabled={props.disabledRadioButton}
        onChange={props.handleClick}
        checked={props.checkedButton}
      />
      <label
        type="text"
        htmlFor={props.key}
        onClick={!props.disabledRadioButton ? props.handleClick : null}
      >
        {labelValue}
      </label>
    </div>
  );
};

export const FilterRadioButtonsStyled = (props) => {
  return (
    <div className="p-formgroup-inline">
      <label style={{ marginRight: 25 }}>Filter By Status:</label>
      {props.renderedFilters}
    </div>
  );
};
