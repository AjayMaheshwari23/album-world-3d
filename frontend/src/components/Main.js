import React from 'react'
import { FloatButton } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Main = (props) => {
      const navigate = useNavigate();

  return (
    <div>
      Gallery here
      <FloatButton
        icon={<LogoutOutlined />}
        type="primary"
        onClick={() => 
        {
            console.log("logged out");
            localStorage.removeItem('token');
            props.showAlert("Logged Out", "info");
           navigate("/");
        }
    }
      />
    </div>
  );
}

export default Main;
