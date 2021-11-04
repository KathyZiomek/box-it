/**A UI component that is used to wrap around other components and output them in a nice looking card */
/**This component is specifically used in the TaskList.js component to ensure that all child elements have unique IDs*/

import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div id={props.id} className={classes.card}>
      {props.children}
    </div>
  );
};

export default Card;
