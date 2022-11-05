import { Container } from "react-bootstrap";
import { AddProductForm } from "../../components/admin/AddProductForm";

export const AddProduct = () => {
  return (
    <Container className="bg-light">
      <div className="text-center mt-5 mb-5 ">
        <h1>ADD PRODUCT</h1>
      </div>
      <AddProductForm />
    </Container>
  );
};
