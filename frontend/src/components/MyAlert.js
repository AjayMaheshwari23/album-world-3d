import React from "react";
import { Alert } from "antd";

function MyAlert(props) {

  if(props.alert==null) return (<>
  </>);

  return (
    <div >
      <Alert type={props.alert.type} message={props.alert.msg} banner />
    </div>
  );
}

export default MyAlert;
