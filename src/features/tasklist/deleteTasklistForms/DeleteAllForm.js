import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";

import { selectTasks, deleteTask } from "../tasklistPieces/tasks/taskSlice";
import {
  selectCategories,
  deleteCategory,
} from "../tasklistPieces/categories/categorySlice";

import { DeleteFormText } from "./deleteFormPieces/DeleteFormText";
import { UIButton } from "../../../ui/uiPieces/UIButton";
import Modal from "../../../ui/uiPieces/Modal";

import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";

export const DeleteAllForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const tasks = useSelector((state) => selectTasks(state));
  const categories = useSelector((state) => selectCategories(state));

  const toast = useRef(null);
  const dispatch = useDispatch();

  const cancelDelete = () => {
    toast.current.show({
      severity: "info",
      summary: "Delete Canceled",
      life: 1500,
    });
  };

  const confirmDelete = () => {
    setIsLoading("loading");

    // toast.current.show({
    //   severity: "info",
    //   summary: "Success",
    //   detail: `Deleting All Data...`,
    //   life: 1500,
    // });

    const deleteContent = () => {
      tasks.forEach((task) => {
        dispatch(deleteTask(task.id));
      });
      categories.forEach((category) => {
        dispatch(deleteCategory(category.id));
      });
      setIsLoading(false);

      toast.current.show({
        severity: "info",
        summary: "Success",
        detail: `All Data Deleted!`,
        life: 1500,
      });
    };
    const toastComplete = () => {
      setTimeout(deleteContent, 1500);
    };

    toastComplete();
  };

  const confirm = () => {
    if (tasks.length === 0 && categories.length === 0) {
      setIsLoading(true);
      toast.current.show({
        severity: "info",
        summary: "No Data To Delete",
        life: 1000,
      });

      const unDisableButton = () => {
        setIsLoading(false);
      };
      const toastComplete = () => {
        setTimeout(unDisableButton, 1000);
      };
      toastComplete();
    } else {
      confirmDialog({
        message:
          "This will delete all of your saved categories and tasks, and you will not be able to retrieve them. Are you sure you want to continue?",
        header: "Warning",
        icon: "pi pi-exclamation-triangle",
        accept: () => confirmDelete(),
        reject: () => cancelDelete(),
      });
    }
  };

  let status = isLoading === "loading";
  let loader = status ? (
    <Modal>
      <Card title="Deleting All Data...">
        <ProgressBar mode="indeterminate" />
      </Card>
    </Modal>
  ) : null;

  return (
    <div>
      <Toast ref={toast} />
      <DeleteFormText />
      <UIButton
        width="15rem"
        margin={8}
        icon={"pi pi-times"}
        label={"Delete All"}
        isLoading={isLoading}
        onClick={confirm}
      />
      {loader}
    </div>
  );
};
