import { Card } from "primereact/card";
import { DeleteAllForm } from "../../features/tasklist/deleteTasklistForms/DeleteAllForm";

const DeleteAllPage = () => {
  let header = <h1>Delete All</h1>;

  return (
    <Card>
      {header}
      <DeleteAllForm />
    </Card>
  );
};

export default DeleteAllPage;
