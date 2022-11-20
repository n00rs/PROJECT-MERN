import { useReducer } from "react";
import { Table } from "react-bootstrap";
import ProductTable from "../../components/admin/ProductTable";
import { PaginationBar } from "../../components/UI/PaginationBar";
import { useEffect } from "react";
import { FETCH_PRODS_API } from "../../api";
import { toast } from "react-toastify";
import { UpdateProdCanvas } from "../../components/admin/UpdateProdCanvas";

const style = {
  border: "none",
  borderRadius: "10px",
  width: "100%",
  backgroundColor: "#fff",
};
const initialState = {
  products: [],
  pageNo: 0,
  totalPages: 0,
  toggleCanvas: false,
  updateProd: {},
};

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "RESPONSE":
      return { ...state, products: action.payload.products, totalPages: action.payload.totalPages };
    case "NEXT":
      return { ...state, pageNo: state.pageNo + 1 };
    case "PREV":
      return { ...state, pageNo: state.pageNo - 1 };
    case "SETPAGENO":
      return { ...state, pageNo: action.pageNo };

    case "UPDATE":
      return {
        ...state,
        products: state.products.map((prod) =>
          prod._id === action.updatedProd._id ? action.updatedProd : prod
        ),
      };
    case "TOGGLEUPDATE":
      return {
        ...state,
        toggleCanvas: true,
        updateProd: state.products.find((prod) => prod._id === action.prodId),
      };
    case "HIDECANVAS":
      return { ...state, toggleCanvas: false };
    default:
      break;
  }
};

const ManageProduct = () => {
  const [productState, dispatch] = useReducer(reducerFunc, initialState);
  const { pageNo, toggleCanvas, updateProd } = productState;

  const useEffectFunc = () => {
    fetch(FETCH_PRODS_API + pageNo, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setProducts(data.products);
        dispatch({ type: "RESPONSE", payload: data });
      })
      .catch((e) => toast.error(e.message));
  };

  useEffect(useEffectFunc, [pageNo]);

  const next = () => dispatch({ type: "NEXT" });
  const prev = () => dispatch({ type: "PREV" });
  const setPage = (pageNo) => dispatch({ type: "SETPAGENO", pageNo });
  const pages = new Array(productState.totalPages).fill(null).map((val, ind) => ind);

  const tbodyContent = productState?.products?.map((product) => (
    <ProductTable product={product} key={product._id} dispatch={dispatch} />
  ));

  return (
    <>
      <div className="container mt-5 p--5">
        <div className="float-">
          <PaginationBar
            pages={pages}
            next={next}
            prev={prev}
            changePage={setPage}
            pageNo={productState.pageNo}
          />
        </div>
        <Table responsive striped borderless hover style={style}>
          <thead>
            <tr className="border-bottom">
              <th>#</th>
              <th>
                <span className="ms-2">Prod Name</span>
                {/* Name */}
              </th>
              <th>Category</th>

              <th>Brand</th>
              <th>Price</th>
              <th>Size</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{tbodyContent}</tbody>
        </Table>
      </div>
      <UpdateProdCanvas show={toggleCanvas} dispatch={dispatch} updateProdValues={updateProd} />
    </>
  );
};

export default ManageProduct;
