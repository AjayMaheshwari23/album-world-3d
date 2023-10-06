import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import '../CSS/Main.css'
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import img1 from "../assets/counting/1.jpg";
import img2 from "../assets/counting/2.jpg";

const { Meta } = Card;

const Main = (props) => {
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <div className="maindiv">
        <div className="cards">
          <Card
            className="galleryitem"
            hoverable
            style={{
              width: 240,
            }}
            onClick={() => navigate("/View1")}
            cover={<img alt="example" src={img1} />}
          >
            <Meta title="Gallery View 1" />
          </Card>
          <Card
            className="galleryitem"
            hoverable
            style={{
              width: 240,
            }}
            onClick={() => navigate("/View2")}
            cover={<img alt="example" src={img2} />}
          >
            <Meta title="Gallery View 2" />
          </Card>
        </div>

        <div>
          <div className="cards">
            <Card bordered={false} className="statcards statleft">
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>

            <Card bordered={false} className="statcards statright">
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Main;
