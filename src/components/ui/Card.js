/**A UI component that is used to wrap around other components and output them in a nice looking card */

import classes from "./Card.module.css";

function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
