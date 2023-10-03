import React from "react";
import { FloatButton } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Starfield from "./Starfield";
import { Card } from "antd";

const { Meta } = Card;

const Main = (props) => {
  const navigate = useNavigate();

  return (
  <>
  <Starfield />
    <div>
      Gallery here
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24 }}
        icon={<CustomerServiceOutlined />}
        >
        <FloatButton
          style={{ backgroundColor: "#79db93" }}
          tooltip={<div>Submit Image</div>}
          />
        <FloatButton
          style={{ backgroundColor: "#d15c5c" }}
          icon={<LogoutOutlined />}
          tooltip={<div>Logout</div>}
          onClick={() => {
            console.log("logged out");
            localStorage.removeItem("token");
            props.showAlert("Logged Out", "info");
            navigate("/");
          }}
          />
      </FloatButton.Group>
    </div>
          </>
  );
};

export default Main;
