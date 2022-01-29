import { Messages } from "primereact/messages";

import { useRef, useEffect } from "react";

const InfoMessage = (props) => {
  const msg = useRef(null);

  useEffect(() => {
    msg.current.show([
      {
        severity: props.severity,
        summary: props.summary,
        detail: props.message,
        sticky: true,
      },
    ]);
  }, [props.severity, props.summary, props.message]);

  return (
    <div style={{ marginTop: 25 }}>
      <Messages ref={msg} />
    </div>
  );
};

export default InfoMessage;
