import { Card, Row, Col, Typography, List } from "antd";
import React from "react";

const UseGuide = () => {
   const data = [
      {
         title: <Typography style={{ fontWeight: 700, fontSize: "16px" }}>Step 1</Typography>,
         des: (
            <>
               <Typography style={{ fontWeight: 400, fontSize: "16px" }}>
                  Log in for registered user <b>(Link sent via SMS)</b>
               </Typography>
               <Typography style={{ fontWeight: 400, fontSize: "16px" }}>
                  Register for unregistered user <b> (Link sent via SMS)</b>
               </Typography>
            </>
         ),
      },
      {
         title: <Typography style={{ fontWeight: 700, fontSize: "16px" }}>Step 2</Typography>,
         des: (
            <>
               <Typography style={{ fontWeight: 400, fontSize: "16px" }}>
                  Deposit P100! Don't worry you'll earn it back!
               </Typography>
            </>
         ),
      },
      {
         title: <Typography style={{ fontWeight: 700, fontSize: "16px" }}>Step 3</Typography>,
         des: (
            <>
               <Typography style={{ fontWeight: 400, fontSize: "16px" }}>
                  And take a screenshot of your account page.
               </Typography>
            </>
         ),
      },
      {
         title: <Typography style={{ fontWeight: 700, fontSize: "16px" }}>Step 4</Typography>,
         des: (
            <>
               <Typography style={{ fontWeight: 400, fontSize: "16px" }}>
                  Attached screenshot here{" "}
                  <a href="https://app.et4m.ph" style={{ fontWeight: 700 }}>
                     https://app.et4m.ph
                  </a>
               </Typography>
            </>
         ),
      },
      {
         title: <Typography style={{ fontWeight: 700, fontSize: "16px" }}>Step 5</Typography>,
         des: (
            <>
               <Typography style={{ fontWeight: 400, fontSize: "16px" }}>
                  Once submitted you'll receive P100 money from us!
               </Typography>
            </>
         ),
      },
   ];
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
                  Thanks for joining our program! <br />
                  Earning money by completing tasks.
               </Typography>

               <Typography
                  style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "20px", marginBottom: "10px" }}
               >
                  REGISTRATION
               </Typography>

               <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item, index) => (
                     <List.Item>
                        <List.Item.Meta
                           avatar={item.title}
                           title={item.des}
                           //  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                     </List.Item>
                  )}
               />

               <Typography style={{ fontSize: "16px", marginBottom: "16px", marginTop: "20px" }}>Thanks,</Typography>
               <Typography style={{ fontSize: "16px", fontWeight: 700 }}>ET4M team</Typography>
            </Col>
            <Col xs={0} md={7}></Col>
         </Row>
      </Card>
   );
};

export default UseGuide;
