import React from "react";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import { Button, Space } from "antd";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";
import "../CSS/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <Row>
        <Button
          span={12}
          type="primary"
          shape="circle"
          style={{ margin: 20 }}
          onClick={() => {
            navigate("/Signin");
          }}
          icon={<DoubleRightOutlined />}
        />
        <Button
          span={12}
          type="primary"
          shape="circle"
          style={{ margin: 20 }}
          onClick={() => {
            navigate("/Signup");
          }}
          icon={<DoubleLeftOutlined />}
        />
      </Row>
      <Row>
        <span span={12} style={{ margin: 20 }} className="whitetxt">
          Login
        </span>
        <span span={12} style={{ margin: 20 }} className="whitetxt">
          Register
        </span>
      </Row>

      <Space direction="vertical">
        <Space wrap>
          <Button
            type="primary"
            icon={<PicCenterOutlined />}
            size="medium"
            onClick={() => {
              navigate("/Main");
            }}
          >
            Enter Without Login
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default Home;
