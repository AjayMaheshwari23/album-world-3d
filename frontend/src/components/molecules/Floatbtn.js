import React from 'react'
import { FloatButton } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  UpCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Gallerysvg from './Gallerysvg';

const Floatbtn = (props) => {
    const navigate = useNavigate();
  return (
    <div>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        icon={<UpCircleOutlined />}
      >
        <FloatButton
          style={{ backgroundColor: "#7ac4ad" }}
          icon={<HomeOutlined />}
          tooltip={<div>Home</div>}
          onClick={() => navigate("/Main")}
        />
        <FloatButton
          style={{ backgroundColor: "#c4b47a" }}
          icon={<Gallerysvg />}
          onClick={() => navigate("/View1")}
          tooltip={<div>View 1</div>}
        />
        <FloatButton
          style={{ backgroundColor: "#c4b47a" }}
          icon={<Gallerysvg />}
          onClick={() => navigate("/View2")}
          tooltip={<div>View 2</div>}
        />
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
  );
}

export default Floatbtn;
