import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const UserOrders = () => {
  const [metaData, setMetaData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const a = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/shop/orders", {
          method: "GET",
          credentials: "include",
        });
        const resData = await res.json();
        if (!res.ok) throw resData;
        console.log(resData);
        const { data, metaData } = resData;
        setData(data);
        setMetaData(metaData);
      } catch (err) {
        console.error(err);
      }
    };
    a();
  }, []);

  const orderCard = data.map((i) => (
    <Card bg="light" className="mb-3 a"  key={i._id}>
      <Card.Body>
        <Row>
          <Col md={3}>
            <Card.Img src={i.products[0].image} style={{ width: "75px", height: "75px" }} />
          </Col>
          <Col md={3}>
            {/* <p>{i.createdAt.substring(0, 10)}</p> */}

            <p>order Total: &#8377; {i.subTotal}</p>
            <p>price after discount : &#8377; {i.total}</p>
            <p> couponCode: {i?.offer?.couponCode}</p>
          </Col>
          <Col>
            <div className="float-end">
              <strong>Receipt No. :</strong> {i.receiptNo} <br />
              <span>
                <strong> Receipt DATE :</strong> {i.createdAt.substring(0, 10)}
              </span>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  ));
  
  return (
    <>
      <section>
        <Container className="mt-3" fluid>
          <Row>
            <Col md={3} xs={6}></Col>
            <Col md={7} xs={6} className=" gap-3">
              {orderCard}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default UserOrders;
