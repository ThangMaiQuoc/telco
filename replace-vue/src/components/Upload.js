import React, { useEffect, useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import UploadBasic from "./UploadFile";
import { Button, Form, Input, message, Row, Col, Image } from "antd";
import { useForm } from "antd/es/form/Form";
import { PhoneFilled, UserOutlined } from "@ant-design/icons";
import "../assets/css/upload.css";

// - Register as a user on the platform and complete the specified a
// - Take a screenshot of the personal account page on either the client’s mobile device or PC to prove that the actions have been completed.
// - Fill in the client’s username and phone number  on our webpage, and upload the screenshot.
// - Click the submit button to complete the process.

const UploadForm = () => {
   const [fileList, setFileList] = useState([]);
   const [isUpload, setIsUpload] = useState(false);

   const [form] = useForm();

   const dataUser = JSON.parse(localStorage.getItem("dataUser"));
   useEffect(() => {
      form.setFieldsValue({
         phoneNumber: dataUser?.phone,
         userName: dataUser?.userName,
      });
   }, [dataUser, form]);

   const handleSubmit = async (values) => {
      if (!fileList || fileList.length < 1) {
         setIsUpload(true);
      } else {
         setIsUpload(false);
      }
      try {
         if (fileList && fileList) {
            const uploadedImagePath = fileList
               .map((item) => {
                  const path = item.response.path;
                  return path.split("/").pop(); // Lấy phần cuối của đường dẫn
               })
               .join(",");

            const imageBonusResponse = await axios.post(
               `${process.env.REACT_APP_API_PUBLIC}/api/v1/consumer/upload/image-bonus`,
               {
                  phone: values.phoneNumber,
                  image: uploadedImagePath,
                  userName: values.userName,
               },
               {}
            );

            if (imageBonusResponse.data) {
               // alert("Bonus image uploaded successfully!");
               message.success("Bonus image uploaded successfully!", 3);

               setTimeout(() => {
                  window.location.reload();
               }, 3000);
            } else {
               // alert("Bonus image upload failed.");
               message.error("Bonus image upload failed.", 5);
            }
         } else {
            // alert("Image upload failed.");
            message.error("Image upload failed.", 5);
         }
      } catch (error) {
         // console.error("Upload failed:", error);
         // alert("Upload failed.");
         message.error(
            error?.response?.data?.title === "Unknown_mobile"
               ? "Unknown phone number"
               : error?.response?.data?.title === "NO_IMAGE"
               ? "No image uploaded"
               : error?.response?.data?.title === "Phone is existed"
               ? "Phone already exists"
               : error?.response?.data?.title === "Username is existed"
               ? "Username already exists"
               : "Unknown error. Please try again"
         );
      }
   };

   const dataStep = [
      {
         title: "Register",
         description: "Register as a user on the platform and complete the specified actions.",
         image: "step1.png",
      },
      {
         title: "Take a screenshot",
         description:
            "Take a screenshot of the personal account page on either the client’s mobile device or PC to prove that the actions have been completed.",
         image: "step2.png",
      },
      {
         title: "Submit Proof ",
         description: " Fill in the client’s username and phone number  on our webpage, and upload the screenshot.",
         image: "step3.png",
      },
      {
         title: "Submit Your Application",
         description: "Click the submit button to complete the process.",
         image: "step4.png",
      },
   ];

   return (
      <>
         <div style={{ minHeight: "100vh" }}>
            <div className="home-background">
               <div className="bg-path"></div>
               <div className="bg-cloud"></div>
               <div className="content-banner d-flex flex-column flex-xl-row align-items-start justify-content-center">
                  {/* <div className="text-banner w-100">
                     <h1 className="text-white fw-bold font-bold text-uppercase text-center">GET YOURS</h1>
                     <h2 className="fw-bold font-bold text-uppercase text-center">BONUS</h2>
                     <h3 className="text-white fw-medium font-medium text-center">Charge 50P Get 50 Fee.</h3>
                  </div> */}
                  <div class="text-banner w-100 d-flex flex-column align-items-center justify-content-start">
                     <div>
                        <h1 class="text-white fw-bold font-bold text-uppercase ">GET</h1>
                        <h1 class="text-white fw-bold font-bold text-uppercase ">YOURS</h1>
                        <h2 class="fw-bold font-bold text-uppercase ">BONUS</h2>
                     </div>
                  </div>
                  <div className="box-banner w-100 h-100 mt-3 mt-lg-0 "></div>
               </div>
            </div>
            <div className="home-content pt-5 position-relative">
               <div
                  style={{
                     height: "20px",
                     background: "#fafafa",
                     position: "absolute",
                     inset: 0,
                     zIndex: 1,
                     top: "-10px",
                  }}
               ></div>
               <Form form={form} onFinish={handleSubmit} className="d-flex flex-column align-items-center">
                  <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4 mb-3">
                     <Form.Item
                        className="mb-0"
                        name="phoneNumber"
                        rules={[
                           {
                              required: true,
                              message: "Please enter your phone number!",
                           },
                        ]}
                     >
                        <Input
                           styles={{ background: "#e4e4e4" }}
                           prefix={<PhoneFilled />}
                           style={{ width: "300px" }}
                           size="large"
                           placeholder="Enter your phone number"
                        />
                     </Form.Item>

                     <Form.Item
                        name="userName"
                        className="mb-0"
                        // label="Phone Number"
                        rules={[
                           {
                              required: true,
                              message: "Please enter your username!",
                           },
                        ]}
                     >
                        <Input
                           prefix={<UserOutlined />}
                           style={{ width: "300px" }}
                           size="large"
                           placeholder="Enter your username"
                        />
                     </Form.Item>
                  </div>

                  <div className="upload-basic">
                     <UploadBasic setFileList={setFileList} fileList={fileList} setIsUpload={setIsUpload} />
                  </div>
                  {isUpload && <p style={{ color: "red" }}>Please choose picture</p>}
                  <div className="btn-submit">
                     <Button
                        onClick={() => form.submit()}
                        className="my-3 w-full flex justify-center  text-white  tracking-wide  shadow-lg cursor-pointer transition ease-in duration-300 text-uppercase rounded-pill fw-bold"
                     >
                        Submit
                     </Button>
                  </div>
               </Form>
            </div>
            <div className="use-guide ">
               <Row className=" d-flex justify-content-center h-100">
                  {dataStep.map((item, index) => (
                     <>
                        <Col xs={24} md={11} className="mt-5 position-relative">
                           <div className="tag-step position-absolute top-0 end-0">
                              <p className="fw-bold text-uppercase text-white">Step</p>
                              <h5 className="text-white fw-bold text-center">0{index + 1}</h5>
                           </div>
                           <div className="use-guide_card  h-100">
                              <div className="card  h-100" key={index}>
                                 <div className="w-100 px-3 h-100">
                                    <h3 className="title text-uppercase fw-bold mb-4">{item.title}</h3>
                                    <div className="h-100 d-flex flex-direction align-items-center justify-content-center">
                                       <Image
                                          src={item.image}
                                          preview={false}
                                          style={{
                                             width: "100%",
                                             height: "auto",
                                          }}
                                       />
                                    </div>
                                 </div>
                                 <div className="description text-center mt-2 mb-5">{item.description}</div>
                              </div>
                           </div>
                        </Col>
                        {index % 2 === 0 && <Col xs={0} md={1} />}
                     </>
                  ))}
               </Row>
            </div>
         </div>
      </>
   );
};

export default UploadForm;
