import React, { useState, useEffect } from "react";
import { Alert } from "antd";
import { Modal } from "antd";

const MyAlert = (props) => {
  const [open, setopen] = useState(0);

  useEffect(() => {
    // Show the modal when props.alert is not null
    if (props.alert) {
      setopen(true);

      if (props.alert.type !== "error") {
        // Setting a timeout 
        const timeoutId = setTimeout(() => {
          setopen(false);
        }, 700);
        
        // Clean up the timeout when the component unmounts
        return () => {
          clearTimeout(timeoutId);
        };

      }
    }
  }, [props.alert]);

  if (props.alert == null) return <> </>;

  return (
    <div>
      <>
        <Modal
          title="Message"
          centered
          open={open}
          onOk={() => setopen(0)}
          onCancel={() => setopen(0)}
          ghost = {true}
        >
          <Alert type={props.alert.type} message={props.alert.msg} banner />
        </Modal>
      </>
    </div>
  );
};

export default MyAlert;
