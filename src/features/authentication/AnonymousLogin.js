import { useDispatch } from "react-redux";

import { getAuth, signInAnonymously } from "firebase/auth";

import { ReturnUid } from "../../api/Firebase";

import ErrorMessages from "./ErrorMessages";

import { userAdded } from "./userSlice";
import { fetchCategories } from "../tasklist/tasklistPieces/categories/categorySlice";
import { fetchTasks } from "../tasklist/tasklistPieces/tasks/taskSlice";

import { Button } from "primereact/button";

export const AnonymousLogin = (props) => {
  const dispatch = useDispatch();

  const anonymousLoginHandler = () => {
    props.setStatus("loading");
    //   event.preventDefault();

    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        props.setStatus("idle");
        const uid = ReturnUid(auth);
        const currentUser = { [uid]: { id: uid, status: "loggedIn" } };

        dispatch(userAdded(currentUser));
        dispatch(fetchCategories());
        dispatch(fetchTasks());
      })
      .catch((error) => {
        props.setStatus("idle");
        const errorCode = error.code;
        props.setErrorMessage(ErrorMessages(errorCode));
        props.setSuccess(false);
      });
  };

  return (
    <div className="p-field">
      <Button
        onClick={anonymousLoginHandler}
        label="Don't want to Register for now? Try a Demo!"
        className="p-button-link"
      ></Button>
    </div>
  );
};
