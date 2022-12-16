import React from "react";
import { Container, Table } from "react-bootstrap";
const style = {
  border: "none",
  borderRadius: "10px",
  width: "100%",
  backgroundColor: "#fff",
};
const Orders = () => {
  return (
    <>
      <section>
        <Container className="mt-5 p--5">
          <Table responsive striped hover style={style}>
            <thead>
              <tr className="border-bottom">
                <th>#</th>
                <th>User-Name</th>
                <th>phone</th>
                <th>subtotal</th>
                <th>total</th>
                <th>payment Method</th>
                
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Container>
      </section>
    </>
  );
};

export default Orders;
