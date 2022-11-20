// import { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
import { OUT_OF_STOCK_API } from "../../api";

const ProductTable = ({ product, dispatch }) => {
  const stockHandler = async (id) => {
    try {
      const res = await fetch(OUT_OF_STOCK_API + id, { credentials: "include", method: "PUT" });
      const data = await res.json();
      if (!res.ok) throw data;
      else {
        dispatch({ type: "UPDATE", updatedProd: data });
        product = data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr className="border-bottom" key={product._id}>
      <td>1</td>
      <td>
        <div className="p-2 d-flex flex-row align-items-center mb-2">
          <img src={product?.images[0]} width="40" className="rounded-circle" alt="" />
          <div className="d-flex flex-column ms-2">
            <span className="d-block font-weight-bold">{product.productName}</span>
            <small className="text-muted">{product?.subcategory}</small>
          </div>
        </div>
      </td>
      <td>
        <div className="p-2">
          <span className="font-weight-bold">{product?.category}</span>
        </div>
      </td>
      <td>
        <div className="p-2">
          <span className="font-weight-bold">{product?.brand}</span>
        </div>
      </td>
      <td>
        <div className="p-2">
          <span className="font-weight-bold">&#8377; {product?.price}</span>
        </div>
      </td>
      <td>
        <div className="p-2 d-flex flex-column text-black">
          {product?.size?.small !== 0 && (
            <Badge className="mb-1">Small :{product?.size?.small} </Badge>
          )}
          {product?.size?.medium !== 0 && (
            <Badge className="mb-1">medium : {product?.size?.medium} </Badge>
          )}
          {product?.size?.large !== 0 && (
            <Badge className="mb-1">large :{product?.size?.large} </Badge>
          )}
          {product?.size?.extraLarge !== 0 && (
            <Badge className="mb-1">Xl :{product?.size?.extraLarge} </Badge>
          )}
          {product?.size?.xxl !== 0 && <Badge className="mb-1">xxl :{product?.size?.xxl} </Badge>}
          {product?.size?.freeSize !== 0 && (
            <Badge className="mb-1"> freeSIZE:{product?.size?.freeSize}</Badge>
          )}
        </div>
      </td>
      <td>
        <div className="p-2 icons">
          <Button size="sm" onClick={()=>dispatch({type:"TOGGLEUPDATE", prodId:product._id})}>update</Button>
          {!product.delete && (
            <Button variant="outline-danger" size="sm" onClick={() => stockHandler(product._id)}>
              Mark Out of Stock
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ProductTable;
