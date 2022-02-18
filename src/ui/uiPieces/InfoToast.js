import { Toast } from "primereact/toast";

import { useRef, useEffect } from "react";

const InfoToast = (props) => {
  const toast = useRef(null);
  let severity, summary;
  let life = 1000;

  if (props.success) {
    severity = "success";
    summary = "Success!";
  } else if (!props.success) {
    severity = "error";
    summary = "Error!";
  }

  useEffect(() => {
    toast.current.show([
      {
        severity: severity,
        summary: summary,
        detail: props.message,
        life: life,
      },
    ]);
  }, [severity, summary, props.message, life]);

  return <Toast ref={toast} />;
};

export default InfoToast;
