/**This component outputs the category titles in the task list - receives props from TaskList.js */

/**TODO: add the ability to delete an entire category with all tasks */
/**TODO: add extra information for the category that is shown when you click on the title (type) */
/**TODO: add styling for the categories */
const Category = ({ category }) => {
  const { name } = category;
  console.log(category);

  return <h3 id={category.id}>{name}</h3>;
};

export default Category;
