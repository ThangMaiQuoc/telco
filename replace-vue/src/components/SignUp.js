import { Card, Row, Col, Typography, Form, Input, Button, message } from "antd";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
   const [form] = Form.useForm();
   const navigate = useNavigate();

   const onFinish = async (values) => {
      const response = await axios.post(
         `${process.env.REACT_APP_API_PUBLIC}/api/v1/consumer/public/registration`,
         {
            phone: values.phone,
            userName: values.username,
            fullName: values.fullname,
            email: values.email,
         },
         {}
      );
      if (response.status === 200) {
         message.success("Successfully!");
         localStorage.setItem("dataUser", {
            phone: response?.data?.phone || values.phone,
            userName: response?.data?.userName || values.username,
         });
         navigate("/use-guide");
      }
   };
   return (
      <Card style={{ minHeight: "100vh" }}>
         <Row>
            <Col xs={0} md={7}></Col>
            <Col xs={24} md={10}>
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                     className="w-25 has-mask h-25 object-center"
                     src="logo.png"
                     alt=""
                     style={{ minHeight: "180px", minWidth: "180px", width: "100%" }}
                  />
               </div>

               <Typography style={{ fontWeight: 700, fontSize: "18px", marginBottom: "16px" }}>
                  Hello from ET4M!
               </Typography>
               <Typography style={{ fontSize: "16px", marginBottom: "16px" }}>
                  ET4M is a wealth project where you can earn money by completing specific tasks.
               </Typography>
               <Typography style={{ fontSize: "16px", marginBottom: "16px" }}>
                  Please take your first task to get P20!
               </Typography>
               <Typography
                  style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "20px", marginBottom: "10px" }}
               >
                  REGISTRATION
               </Typography>
               <Form form={form} onFinish={onFinish}>
                  <Form.Item name="fullname" rules={[{ required: true, message: "Please enter your full name" }]}>
                     <Input style={{ height: "42px" }} placeholder="Full name" />
                  </Form.Item>
                  <Form.Item name="username" rules={[{ required: true, message: "Please enter your user name" }]}>
                     <Input style={{ height: "42px" }} placeholder="User name" />
                  </Form.Item>
                  <Form.Item name="phone" rules={[{ required: true, message: "Please enter your phone number" }]}>
                     <Input style={{ height: "42px" }} placeholder="Phone number" />
                  </Form.Item>
                  <Form.Item name={"email"} rules={[{ required: true, message: "Please enter your email" }]}>
                     <Input style={{ height: "42px" }} placeholder="Email" />
                  </Form.Item>
                  <Typography style={{ fontWeight: 700, marginBottom: "16px" }}>
                     Thanks for signing up and completing your first task.
                     <br /> We'll sent you P20 money and an invite to get started soon!
                  </Typography>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                     <Button htmlType="submit" type="primary">
                        Join Now
                     </Button>
                  </div>
               </Form>
               <Typography style={{ fontSize: "16px", marginBottom: "16px" }}>Thanks,</Typography>
               <Typography style={{ fontSize: "16px", fontWeight: 700 }}>ET4M team</Typography>
            </Col>
            <Col xs={0} md={7}></Col>
         </Row>
      </Card>
   );
};

export default SignUp;
