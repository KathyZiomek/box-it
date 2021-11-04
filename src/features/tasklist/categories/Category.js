/**This component outputs the category titles in the task list - receives props from TaskList.js */

/**TODO: add the ability to delete an entire category with all tasks */
/**TODO: add extra information for the category that is shown when you click on the title (type) */
/**TODO: add styling for the categories */
function Category(props) {
  return <h3 id={props.id}>{props.category}</h3>;
}

export default Category;
