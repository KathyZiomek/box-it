/**This file handles the component that creates the dropdown with the existing category names that is output in the NewTaskForm component -> CreateTask page */

import { Fragment } from "react";

const CategoryDropDown = (props) => {
  return (
    <Fragment>
      {/* TODO: add a blank/no category option to the dropdown */}
      <option id={props.id} value={props.name}>
        {props.name}
      </option>
    </Fragment>
  );
};

export default CategoryDropDown;
