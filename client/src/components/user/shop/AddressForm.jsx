import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { USER_DATA_API } from "../../../api";
import { toast } from "react-toastify";

export const CheckOutAddressForm = () => {
  const [userData, setUserData] = useState();
  const [formData, setFormData] = useState();
  const [addressId, setAddresId] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(USER_DATA_API, { credentials: "include" });
        const resData = await res.json();
        if (!res.ok) throw resData;

        console.log(resData);
        setUserData(resData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  const FormHandler = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(formData, "gg");
      // alert(formData);
      const res = await fetch(USER_DATA_API, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const resData = await res.json();

      if (!res.ok) throw resData;
      setUserData(resData);
      console.log(resData, "data");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const z = (e) => setAddresId(e.target.value);

  // console.log(userData);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-4">
        <h3 className="fs-5 fw-bolder m-0 lh-1">Address</h3>
        <button className="btn btn-dark" onClick={() => setShowForm((prev) => !prev)}>
          Add address
        </button>

        <small className="text-muted fw-bolder">
          Already registered? <a href="./login.html">Login</a>
        </small>
      </div>
      <Row>
        {/* <Form> */}
        {userData?.address?.map((addr) => (
          <Form.Group className="p-3 bg-light" key={addr._id}>
            <Form.Label>
              <div className="d-flex flex-row align-items-center cursor-pointer">
                <Form.Check type="radio" onChange={z} id="1" value={addr._id} name="address" />
                <div className="d-flex flex-column ms-3">
                  <h6 className="fw-bold">{userData?.firstName + userData?.lastName}</h6>
                  <h6 className="fw-bold">{addr?.phone}</h6>

                  <span>
                    {`${addr?.address},  ${addr?.city} `} <br />
                    {`${addr?.state} ${addr?.pincode}`}
                  </span>
                </div>
              </div>
            </Form.Label>
          </Form.Group>
        ))}
        {/* </Form> */}
      </Row>

      <h3 className="fs-5 mt-5 fw-bolder mb-4 border-bottom pb-4">Shipping Address</h3>
      {showForm && (
        <Form onSubmit={submitHandler}>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" name="phone" onChange={FormHandler} />
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control type="text" name="city" onChange={FormHandler} id="city" />
              </Form.Group>
            </Col>

            <div className="col-12">
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="123 Some Street Somewhere"
                  onChange={FormHandler}
                />
              </Form.Group>
            </div>

            <div className="col-12">
              <Form.Group>
                <Form.Label>LandMark</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="places near you"
                  name="landmark"
                  onChange={FormHandler}
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  placeholder="State..."
                  onChange={FormHandler}
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label>Zip/Post Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Zipcode...."
                  name="pincode"
                  onChange={FormHandler}
                />
              </Form.Group>
              <button className="btn btn-dark w-100 w-md-auto mt-5 small">Add Address</button>
            </div>
          </Row>
        </Form>
      )}

      <div className="pt-5 mt-2 pb-5 border-top d-flex justify-content-md-end align-items-center">
        <button className="btn btn-dark w-100 w-md-auto">Proceed to shipping</button>
      </div>
    </>
  );
};
