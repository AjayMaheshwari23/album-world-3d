import React, { useState, useEffect } from "react";
import { Button, message, Space } from "antd";

const MyAlert = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };
  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
      duration: 5,
    });
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };

  const info = (msg) => {
    messageApi.info(props.alert.msg);
  };

  useEffect(() => {
    // Show the modal when props.alert is not null
    if (props.alert) {
      if (props.alert.type === "success") {
        success(props.alert.msg);
      } else if (props.alert.type === "error") {
        error(props.alert.msg);
      } else if (props.alert.type === "info") {
        info(props.alert.msg);
      }
    }
  }, [props.alert]);

  if (props.alert == null) return <> </>;

  return (
    <>{contextHolder}</>
  );
};

export default MyAlert;
