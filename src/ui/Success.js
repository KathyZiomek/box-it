import { Messages } from "primereact/messages";

import { useRef, useEffect } from "react";

const Success = () => {
  const msg = useRef(null);

  useEffect(() => {
    msg.current.show([
      {
        severity: "success",
        summary: "Success! ",
        detail: "",
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

export default Success;
