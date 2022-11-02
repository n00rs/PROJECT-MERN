import { Badge, Button } from "react-bootstrap";

export const UserTable = ({data:user, index,blockHandler}) => {


  // console.log(data);
  // const userData = useLoaderData();
  // const [users, setUsers] = useState(userData);
  // setUsers(userData);
  // console.log(data, "data from loader function");
  // const fetchUsers = async () => {
  //   try {
  //     const res = await fetch(ADMIN_ALLUSERS_URL, { credentials: "include" });
  //     const data = await res.json();
  //     if (res.ok) setUsers(data);
  //     else throw data;
  //   } catch (err) {
  //     toast.error(err.message);
  //     console.error(err.message, "error in fetch");
  //   }
  // };
  // useEffect(() => {
  //   // toast('err')
  //   fetchUsers();
  // }, []);
  // console.log(users);
 
  // const blockHandler = async (id) => {
  //   try {
  //     const res = await fetch(BLOCK_USER_URL + id, {
  //       method: "put",
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log(data);

  //     if (!res.ok) throw data;
  //     else {
  //       setUsers((prev) =>
  //         prev.map((user) => (user._id === data._id ? data : user))
  //       );
  //       //  users = users.map((user) => (user._id === data._id ? data : user));
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };

  return (
    <tr className="border-bottom" key={user._id}>
      <td>{index}</td>
      <td>
        <div className="p-2 d-flex flex-row align-items-center mb-2">
          <img src={user?.picture} width="40" className="rounded-circle" />
          <div className="d-flex flex-column ms-2">
            <span className="d-block font-weight-bold">{user?.firstName}</span>
            <small className="text-muted">{user?.lastName}</small>
          </div>
        </div>
      </td>
      <td>
        <div className="p-2">
          <span className="font-weight-bold">{user?.email}</span>
        </div>
      </td>
      <td>
        <div className="p-2 d-flex flex-column">
          <span>1 City point,#2A</span>
          <span> Brooklyn,NY</span>
        </div>
      </td>
      <td>
        <div className="p-2">
          <Badge
            bg={`${user?.isBlocked ? "danger" : "warning"}`}
            className="font-weight-bold"
          >
            {user?.isBlocked ? "Blocked" : "Active"}
          </Badge>
        </div>
      </td>
      <td>
        <div className="p-2">
          <Button
            size="sm"
            variant="warning"
            onClick={() => blockHandler(user._id)}
          >
            {user?.isBlocked ? "Unblock User" : "Block User"}
          </Button>
        </div>
      </td>
      <td>
        <div className="p-2 icons">
          <Button size="sm" variant="success">
            {"Orders"}
          </Button>
        </div>
      </td>
      <td>
        <div className="p-2 icons">
          <Button size="sm" variant="dark">
            blogs
          </Button>
        </div>
      </td>
    </tr>
  );
};


