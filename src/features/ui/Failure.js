import { Messages } from "primereact/messages";

import { useRef, useEffect } from "react";

const Failure = () => {
  const msg = useRef(null);

  useEffect(() => {
    msg.current.show([
      {
        severity: "error",
        summary: "Error - ",
        detail: "Submit Failed.",
        sticky: true,
      },
    ]);
  }, []);

  return (
    <div>
      <Messages ref={msg} />
    </div>
  );
};

export default Failure;
