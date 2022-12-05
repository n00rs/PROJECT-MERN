import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useActionData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
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
  // const {} = useActionData();
  const { state } = useNavigation();

  console.log(state);
  let data = useActionData();

  // if (data) {
  //   update(data);
  //   // setOffers(prev=>[...prev,data])
  //   data = null;
  //   // setShowForm(false)
  // }
  console.log(data, "data");

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
      const res = await fetch(OFFERS_API + "/" + id, { credentials: "include" });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
      toast.error("error in removing offer");
    }
  };

  const addCouponToggler = () => setShowForm((prev) => !prev);

  // if (data) {
  //   // setShowForm(false);
  //    setOffers((prev) => [...prev, data]);
  //   // data = null
  // }

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
