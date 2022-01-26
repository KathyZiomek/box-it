import { Messages } from "primereact/messages";

import { useRef, useEffect } from "react";

const Failure = (props) => {
  const msg = useRef(null);

  useEffect(() => {
    msg.current.show([
      {
        severity: "error",
        detail: props.message,
        sticky: true,
      },
    ]);
  }, [props.message]);

  return (
    <div>
      <Messages ref={msg} />
    </div>
  );
};

export default Failure;
