/**This file contains the component for the New Category Form that creates the form on CreateCategory.js */

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
// import Success from "../../ui/Success";
import Card from "../../ui/Card";

/**Accepts props from CreateCategory.js */
const NewCategoryForm = () => {
  const [newCategory, setNewCategory] = useState("");
  const dispatch = useDispatch();

  //listen for the enter key
  //TODO: change this behaviour (listening for the enter key) to listening for the submit button click
  const handleChange = (e) => setNewCategory(e.target.value);

  // const handleKeyDown = (e) => {
  //   const trimmedCategory = e.target.value.trim();
  //   //If the user pressed the enter key
  //   if (e.key === "Enter" && trimmedCategory) {
  //     //dispatch the "category added" action with this text
  //     dispatch({ type: "tasklist/categoryAdded", payload: trimmedCategory });
  //     //and clear out the text input
  //     setNewCategory("");
  //   }
  // };

  // /**Setting refs for the inputs */
  const categoryInputRef = useRef();
  // const typeInputRef = useRef();
  // const colorInputRef = useRef();

  const newCategoryHandler = () => {
    setNewCategory(true);
  };

  // const closeSuccessMessage = () => {
  //   setNewCategory(false);
  // };

  /**Function that handles when the submit button is clicked */
  /**TODO: add data validation for new category information */
  const submitHandler = (event) => {
    /**Avoid the default response from the browser */
    event.preventDefault();

    // /**get the refs for entered values */
    const enteredCategory = categoryInputRef.current.value;
    // const enteredType = typeInputRef.current.value;
    // const enteredColor = colorInputRef.current.value;

    const trimmedCategory = enteredCategory.trim();
    //If the user pressed the enter key
    if (trimmedCategory) {
      //dispatch the "category added" action with this text
      dispatch({ type: "tasklist/categoryAdded", payload: trimmedCategory });
      //and clear out the text input
      setNewCategory("");
    }

    // /**TODO: remove hard-coded sample tasklist data */
    // const categoryData = {
    //   name: enteredCategory,
    //   type: enteredType,
    //   color: enteredColor,
    //   tasklist: [
    //     { name: "Test 1", duedate: "date" },
    //     { name: "Test 2", duedate: "date" },
    //   ],
    // };

    // /**sending the taskData up to CreateCategory.js page so it can be sent to firebase */
    // props.onAddCategory(categoryData);
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <hr />
        <label htmlFor="categoryName">Category Name</label>
        <br />
        <input
          type="text"
          id="categoryName"
          placeholder="Enter category name here..."
          value={newCategory}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
          // onClick={closeSuccessMessage}
          ref={categoryInputRef}
        />
        <br />
        {/* TODO: have the category types be dynamically generated in the drop down from Firebase */}
        <label htmlFor="categoryType">Type</label>
        <br />
        <select
          name="categoryType"
          id="categoryType"
          // ref={typeInputRef}
          // onClick={closeSuccessMessage}
        >
          <option value="school">School</option>
          <option value="personal">Personal</option>
          <option value="Work">Work</option>
        </select>
        <br />
        {/* TODO: figure out how to output sample colors in a dropdown in this form */}
        {/* TODO: have the category colours be dynamically generated in the drop down from Firebase */}
        <label htmlFor="categoryColor">Color</label>
        <br />
        <select
          name="categoryColor"
          id="categoryColor"
          // ref={colorInputRef}
          // onClick={closeSuccessMessage}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
        </select>
        <br />
        <button onClick={newCategoryHandler}>Submit</button>
        {/* <button>Submit</button> */}
      </form>
      {/* {newCategory && <Success onClick={closeSuccessMessage} />} */}
    </Card>
  );
};

export default NewCategoryForm;
