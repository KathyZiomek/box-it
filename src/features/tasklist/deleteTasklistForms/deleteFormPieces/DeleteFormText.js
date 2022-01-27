export const DeleteFormText = (props) => {
  let body = (
    <div>
      <p>
        <i className="pi pi-exclamation-triangle"></i>Warning!
      </p>
      <p>
        Clicking the button will delete all of your saved categories and tasks.
        Are you sure you wish to continue?
      </p>
    </div>
  );

  return body;
};
