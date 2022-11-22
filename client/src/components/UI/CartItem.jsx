import { useDispatch } from "react-redux";
import { updateCart } from "../../store/shopSlice";
import styles from "../user/shop/CartStyles.module.css";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();


  return (
    <div className="row mx-0 py-4 g-0 border-bottom">
      <div className="col-2 position-relative">
        <picture className="d-block border">
          <img className="img-fluid" src={item?.image} alt="" />
        </picture>
      </div>
      <div className="col-9 offset-1">
        <div>
          <h6 className="justify-content-between d-flex align-items-start mb-2">
            {item.name}
            <i className={`${styles["ri-close-line"]} ms-3`}></i>
          </h6>
          <span className="d-block text-muted fw-bolder text-uppercase fs-9">
            Size: {item.size} / Qty: {item.quantity}
          </span>
        </div>

        <div className={`${styles["count-box"]} mt-2`}>
          <button
            className={styles["count-btn"]}
            onClick={() =>
              dispatch(updateCart({ prodId: item?.prodId, size: item?.size, quantity: -1 }))
            }
          >
            –
          </button>
          <div className={styles["count-num"]}>
            <input
              type="text"
              className={styles["count-inp-box"]}
              defaultValue={item?.quantity}
              disabled
            />
          </div>
          <button
            className={styles["count-btn"]}
            onClick={() =>
              dispatch(updateCart({ prodId: item?.prodId, size: item.size, quantity: 1 }))
            }
            // onClick={() => addQty(item?.prodId, item.size,1)}
          >
            +
          </button>
        </div>

        <p className="fw-bolder text-end text-muted m-0">&#8377; {item?.price}</p>
      </div>
    </div>
  );
};
