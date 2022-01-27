import { useDispatch, useSelector } from "react-redux";

import { deleteTask } from "../tasklistPieces/tasks/taskSlice";
import { deleteCategory } from "../tasklistPieces/categories/categorySlice";

import { DeleteFormText } from "./deleteFormPieces/DeleteFormText";
import { DeleteFormButton } from "./deleteFormPieces/DeleteFormButton";

export const DeleteAllForm = () => {
  const dispatch = useDispatch();

  const deleteAll = () => {
    console.log("test");
  };

  return (
    <div>
      <DeleteFormText />
      <DeleteFormButton
        icon={"pi pi-times"}
        label={"Delete All"}
        action={deleteAll}
      />
    </div>
  );
};
