import React from "react";
import { Modal, Form as BootForm, Col, FloatingLabel, Button } from "react-bootstrap";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { OFFERS_API } from "../../api";
// import
const AddCoupon = ({ toggle, show, submitting }) => {
  return (
    <Modal show={show} onHide={toggle} size={""}>
      <Modal.Header closeButton>Close</Modal.Header>
      <Modal.Body>
        <Form action="/admin/manage-offers" method="POST">
          <FloatingLabel className="mb-3" label="code">
            <BootForm.Control placeholder="code" required type="text" name="couponCode" />
            <BootForm.Text>code should be unique</BootForm.Text>
          </FloatingLabel>
          <FloatingLabel className="mb-3" label="Max Discount Price &#8377;">
            <BootForm.Control placeholder="code" type="number" name="maxDiscountPrice" />
          </FloatingLabel>
          <FloatingLabel className="mb-3" label="Max Discount Percent %">
            <BootForm.Control placeholder="code" name="discountPercent" type="text" />
          </FloatingLabel>
          <FloatingLabel className="mb-3" label="minmum Purchase Amount &#8377;">
            <BootForm.Control placeholder="code" name="minmumPurchaseAmount" type="number" />
          </FloatingLabel>
          <FloatingLabel className="mb-3" label="validity">
            <BootForm.Control placeholder="code" type="date" name="expiryDate" required />
          </FloatingLabel>
          select type
          <BootForm.Label className="mb-3" required>
            <BootForm.Check
              inline
              type="radio"
              name="type"
              label="isConditional"
              value="isConditional"
            />
            <BootForm.Check
              inline
              type="radio"
              name="type"
              label="isPercentOnly"
              value="isPercentOnly"
            />
            <BootForm.Check
              inline
              type="radio"
              name="type"
              label="isAmountOnly"
              value="isAmountOnly"
            />
          </BootForm.Label>
          <Button variant="warning" type="submit" disabled={submitting}>
            {submitting ? "Adding" : "Add new Offer"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCoupon;

export const actions = async ({ request }) => {
  try {
    const formData = await request.formData();
    const body = {
      couponCode: formData.get("couponCode"),
      expiryDate: formData.get("expiryDate"),
      maxDiscountPrice: formData.get("maxDiscountPrice"),
      discountPercent: formData.get("discountPercent"),
      minmumPurchaseAmount: formData.get("minmumPurchaseAmount"),
      type: formData.get("type"),
    };
    console.log(body);
    // return body;
    const res = await fetch(OFFERS_API, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw data;
    console.log(data);
    return redirect("/admin/manage");
  } catch (err) {
    toast.error("error in  adding new offer");
  }
};
