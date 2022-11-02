import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { UserTable } from "../../components/admin/UserTable";
import { ADMIN_ALLUSERS_URL, BLOCK_USER_URL } from "../../Constant";

const style = {
  border: "none",
  borderRadius: "10px",
  width: "100%",
  backgroundColor: "#fff",
};

const ManageUsers = () => {
  const userData = useLoaderData();
  const [users, setUsers] = useState(userData);

  const blockHandler = async (id) => {
    try {
      const res = await fetch(BLOCK_USER_URL + id, {
        method: "put",
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) throw data;
      else {
        setUsers((prev) =>
          prev.map((user) => (user._id === data._id ? data : user))
        );
        //  users = users.map((user) => (user._id === data._id ? data : user));
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const tbodyContent = users.map((user, index) => (
    <UserTable
      key={user._id}
      data={{ ...user }}
      blockHandler={blockHandler}
      index={index}
    />
  ));

  return (
    <div className="container mt-5 p--5">
      <Table responsive striped borderless hover style={style}>
        <thead>
          <tr className="border-bottom">
            <th>#</th>
            <th>
              <span className="ms-2">Name</span>
              {/* Name */}
            </th>
            <th>Email</th>
            <th>View Details</th>
            <th>status</th>
            <th>action</th>
            <th>orders</th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>{tbodyContent}</tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
export const fetchUsers = async ({ request, params }) => {
  console.log(request, params);
  const res = await fetch(ADMIN_ALLUSERS_URL, { credentials: "include" });
  // const data = await res.json();
  if (res.ok) return res;
  else throw res;
};