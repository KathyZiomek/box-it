/**A temporary component that displays a success message when a button is clicked */
/**TODO: make the success component more sophisticated looking */

const Success = (props) => {
  return (
    <div onClick={props.onClick}>
      <p>Submitted!</p>
    </div>
  );
};

export default Success;
