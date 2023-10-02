import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
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

  const [credentials, setcredentials] = useState({ name:"" , email: "", password: "" , cpassword:"" });

  const handlesubmit = async (e) => {
    e.preventDefault();
    if(credentials.password !== credentials.cpassword){
      props.showAlert("Passwords do not match", "error");
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
      //   alert(response.error.message);
      //   return;
        // throw new Error(`HTTP error! Status: ${response.status}`);
      // }

      // Parse the response body as JSON
      const data = await response.json();


      // Log the data to the console
      console.log("Response data:", data);
      if (data.success) {
        navigate("/Signin");
      } else {
        console.log(data.errors);
        let txt= "";
        data.errors.forEach(ele => {
          txt += ele.msg;
          txt += '\n'
        });
        alert(txt);
      }
    } catch (error) {
      console.error("Error:", error);
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
            label="name"
            name="name"
            value={credentials.name}
            onChange={(e) => {
              setcredentials({ ...credentials, ["name"]: e.target.value });
              console.log(credentials);
            }}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>


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
            <Input.Password />56
          </Form.Item>

          <Form.Item
            label="cPassword"
            name="cpassword"
            fieldId="cpassword"
            value={credentials.cpassword}
            onChange={(e) => {
              setcredentials({ ...credentials, ["cpassword"]: e.target.value });
              console.log(credentials);
            }}
            rules={[
              {
                required: true,
                message: "Please input your Confirm password!",
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
