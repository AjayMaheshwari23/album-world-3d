import React from "react";
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import { Button, Tooltip, Space } from "antd";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();


  return (
    <>
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
          <span span={12} style={{ margin: 20 }}>
            Login
          </span>
          <span span={12} style={{ margin: 20 }}>
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
                navigate("/Signin");
              }}
            >
              Enter Without Login
            </Button>
          </Space>
        </Space>
      </div>
    </>
  );
};

export default Home;
