import React from "react";
import { useState } from "react";
import { Button, Form, Input } from "antd";
import { LockTwoTone, MailTwoTone, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// require("dotenv").config();
// const LOGIN = process.env.LOGIN;
const REGISTER = "http://localhost:5000/api/auth/createuser";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Signin = (props) => {
  const navigate = useNavigate();

  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [loading, isloading] = useState(0);

  const handlesubmit = async (e) => {
    isloading(true);
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "error");
      isloading(false);
      return;
    }
    try {
      // Make a GET request to the URL
      const response = await fetch(REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      console.log(response);

      // Check if the response status is OK (HTTP 200-299)
      // if (!response.success) {
      //    alert(response.error.message);
      //   return;
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // Parse the response body as JSON
      const data = await response.json();

      // Log the data to the console
      console.log("Response data:", data);
      if (data.success) {
        props.showAlert("Successfully Registeres", "success");
        navigate("/Signin");
      } else {
        console.log(data.errors);
        data.errors.forEach((ele) => {
          props.showAlert(ele.msg, "error");
        });
        // alert(txt);
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
          Register{" "}
        </h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Name!" }]}
          value={credentials.name}
          onChange={(e) => {
            setcredentials({ ...credentials, ["name"]: e.target.value });
            console.log(credentials);
          }}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
          value={credentials.email}
          onChange={(e) => {
            setcredentials({ ...credentials, ["email"]: e.target.value });
            console.log(credentials);
          }}
        >
          <Input
            prefix={<MailTwoTone className="site-form-item-icon" />}
            placeholder=" Email"
          />
        </Form.Item>
        <Form.Item
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
          <Input.Password
            placeholder=" Password"
            prefix={<LockTwoTone className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="cpassword"
          fieldId="cpassword"
          value={credentials.password}
          onChange={(e) => {
            setcredentials({ ...credentials, ["cpassword"]: e.target.value });
            console.log(credentials);
          }}
          rules={[
            {
              required: true,
              message: "Re-Enter your password!",
            },
          ]}
        >
          <Input.Password
            placeholder=" Confirm Password"
            prefix={<LockTwoTone className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={handlesubmit}
            style={{ marginRight: 10 }}
            loading={loading}
          >
            Register
          </Button>
          <span className="whitetxt specialtxt"> Or </span>
          <a
            onClick={() => {
              navigate("/Signin");
            }}
          >
            Already have Credentials !
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Signin;
