import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
// require("dotenv").config();
// const LOGIN = process.env.LOGIN;
const LOGIN = "http://localhost:5000/api/auth/login";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Signin = (props) => {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({ email: "", password: "" });

  const handlesubmit = async (e) => {
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
      console.log("Response data:", data);
      if (data.success) {
        localStorage.setItem("token", data.jwtToken);
        navigate("/");
        props.showAlert("SuccessFul login", "success");

      } else {
        props.showAlert("Invalid credentials", "error");
      }
    } catch (error) {
      console.log("Error:", error);
      
    }
  };

  // const onchange = (e) => {
  //   setcredentials({ ...credentials, [e.target.type]: e.target.value }); // !! using type
  //   console.log(credentials);
  // }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form
          //   onsubmit={handlesubmit}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            value={credentials.email}
            onChange={(e) => {
              setcredentials({ ...credentials, ["email"]: e.target.value });
              console.log(credentials);
            }}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            fieldId="password"
            value={credentials.password}
            onChange={(e) => {
              setcredentials({ ...credentials, ["password"]: e.target.value });
              console.log(credentials);
            }}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handlesubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Signin;
