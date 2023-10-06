import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockTwoTone, MailTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../CSS/Signin.css";
import UserContext from "../UserContext";

// require("dotenv").config();
// const LOGIN = process.env.LOGIN;
const LOGIN = "http://localhost:5000/api/auth/login";

const onFinish = (values) => {
  console.log("Success:", values);
};

const Signin = (props) => {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [loading, isloading] = useState(0);
  const userContext = useContext(UserContext);
  console.log(userContext);
  const handlesubmit = async (e) => {
    isloading(true);
    e.preventDefault();
    try {
      // Make a GET request to the URL
      const response = await fetch(LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      // Parse the response body as JSON
      const data = await response.json();

      // Log the data to the console
      // console.log("Response data:", data);
      if (data.success) {
        userContext.setAuthData(data.jwtToken);
        localStorage.setItem("token", data.jwtToken);
        props.showAlert("Successful Login", "success");
        navigate("/Main");
      } else {
        props.showAlert("Invalid credentials", "error");
      }
    } catch (error) {
      console.log("Error:", error);
    }

    isloading(false);
  };

  // const onchange = (e) => {
  //   setcredentials({ ...credentials, [e.target.type]: e.target.value }); // !! using type
  //   console.log(credentials);
  // }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1
          className="whitetxt specialtxt"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {" "}
          Login{" "}
        </h1>
        <Form.Item
          name="email"
          value={credentials.email}
          onChange={(e) => {
            setcredentials({ ...credentials, ["email"]: e.target.value });
            // console.log(credentials);
          }}
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<MailTwoTone className="site-form-item-icon" />}
            placeholder=" Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockTwoTone className="site-form-item-icon" />}
            type="password"
            placeholder=" Password"
            value={credentials.password}
            onChange={(e) => {
              setcredentials({
                ...credentials,
                ["password"]: e.target.value,
              });
              // console.log(credentials);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="whitetxt">Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handlesubmit}
            style={{ marginRight: 10 }}
            loading={loading}
            // disabled={loading}
          >
            Log in
          </Button>
          <span className="whitetxt specialtxt"> Or </span>
          <a
            onClick={() => {
              navigate("/Signup");
            }}
          >
            register now!
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Signin;
