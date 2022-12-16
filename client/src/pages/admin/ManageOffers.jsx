import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { OFFERS_API } from "../../api";
import { TrashIcon } from "../../assets/icons/TrashIcon";
import AddCoupon from "../../components/admin/AddCoupon";

const style = {
  border: "none",
  borderRadius: "10px",
  width: "100%",
  backgroundColor: "#fff",
};
const ManageOffers = () => {
  const [offers, setOffers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { state } = useNavigation();
  let data = useActionData();

  console.log(data, "data");

  useEffect(() => {
    if (data) {
      setOffers((prev) => [...prev, data]);
      setShowForm(false);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(OFFERS_API, { credentials: "include" });
        const data = await res.json();
        if (!res.ok) throw data;
        console.log(data);
        setOffers(data);
      } catch (err) {
        console.log(err);
        toast.error("error in fetching  offers ");
      }
    };
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { isConfirmed } = await Swal.fire(
        "are you sure ?",
        "wanna remove this offer",
        "warning"
      );
      if (!isConfirmed) return;
      const res = await fetch(OFFERS_API + "/" + id, { method: "DELETE", credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw data;
      setOffers((prev) => prev.filter((offer) => offer._id !== id));
      console.log(data);
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error("error in removing offer");
    }
  };

  const addCouponToggler = () => setShowForm((prev) => !prev);

  return (
    <>
      <section>
        <Container className="mt-5 p--5">
          <div className="text-center">
            <Button onClick={addCouponToggler}>ADD OFFER</Button>
          </div>
          <Table responsive striped hover style={style}>  
            <thead>
              <tr className="border-bottom">
                <th>#</th>
                <th>Coupon Code</th>
                <th>Coupon type</th>
                <th>DiscountPercent</th>
                <th>Max Discount Price:</th>
                <th>minmumPurchaseAmount</th>
                <th>expiry</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {offers?.map((off, i) => (
                <tr key={off?._id}>
                  <td>{++i}</td>
                  <TableD content={off?.couponCode} />
                  <TableD content={off?.type} />
                  <TableD content={off?.discountPercent} />
                  <TableD content={off?.maxDiscountPrice} />
                  <TableD content={off?.minmumPurchaseAmount} />
                  <TableD content={new Date(off?.expiryDate).toDateString()} />
                  <td>
                    <div className="p-2">
                      <Button variant="outline-danger" onClick={() => deleteHandler(off?._id)}>
                        <TrashIcon />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </section>
      <AddCoupon show={showForm} toggle={addCouponToggler} submitting={state === "submitting"} />
    </>
  );
};

export default ManageOffers;

function TableD({ content }) {
  return (
    <td>
      <div className="p-2">
        <span className="font-weight-bold">{content}</span>
      </div>
    </td>
  );
}
