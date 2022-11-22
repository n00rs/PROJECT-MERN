import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../store/shopSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CART_API } from "../../../api";
import { toast } from "react-toastify";
import { CartItem } from "../../UI/CartItem";

let count = 0;
export const CartTab = () => {
  console.log(count++);

  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.shop);

  const clearcart = async () => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure ?",
        icon: "warning",
        confirmButtonColor: "#212529",
        showCancelButton: true,
      });

      if (isConfirmed) {
        const res = await fetch(CART_API, { method: "DELETE", credentials: "include" });
        const { deletedCount, ...resData } = await res.json();
        if (!res.ok) throw resData;
        if (deletedCount === 1) {
          dispatch(clearCart());
        }
      }
    } catch (e) {
      console.error(e, "clear cart");
      toast("failed to update");
    }
  };

  if (!cart?.cartItems)
    return (
      <>
        <Link className="btn bg-light mb-md-0 w-md-auto float-end" type="button" to={"/shop"}>
          start Shopping
        </Link>
        <h3 className="fs-5 fw-bolder mb-0 border-bottom pb-4">
          Your Cart is empty start shopping
        </h3>
      </>
    );

  return (
    <>
      <button
        className="btn bg-light mb-md-0 w-md-auto float-end"
        type="button"
        onClick={clearcart}
      >
        Clear Cart
      </button>
      <h3 className="fs-5 fw-bolder mb-0 border-bottom pb-4">Your Cart</h3>
      <div className="table-responsive">
        <table className="table align-middle">
          <tbody className="border-0">
            {cart?.cartItems?.map((item) => (
              <tr key={Math.random()}>
                <td style={{ borderStyle: "none" }}>
                  <CartItem item={item} key={Math.random()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const SideContent = ({ handleNavlinks }) => {
  // console.log("hi");
  const { cart } = useSelector((state) => state.shop);

  const proceedHandler = () => handleNavlinks("address");

  return (
    <div className="p-4">
      <div className="pb-4 border-bottom">
        <div className="d-flex flex-column flex-md-row justify-content-md-between mb-4 mb-md-2">
          <div>
            <p className="m-0 fw-bold fs-5">Grand Total</p>
            <span className="text-muted small">Inc $45.89 sales tax</span>
          </div>
          <p className="m-0 fs-5 fw-bold">&#8377; {cart?.cartTotal}</p>
        </div>
      </div>
      <div className="py-4">
        <div className="input-group mb-0">
          <input type="text" className="form-control" placeholder="Enter coupon code" />
          <button className="btn btn-secondary btn-sm px-4">Apply</button>
        </div>
      </div>
      <a className="btn btn-dark w-100 text-center" role="button" onClick={proceedHandler}>
        Proceed to checkout
      </a>
    </div>
  );
};
