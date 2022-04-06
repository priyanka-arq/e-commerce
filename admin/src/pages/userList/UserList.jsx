import { Fragment, default as React } from "react";
import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { userRows } from "../../utils/mockData";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../../redux/apiCalls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserList() {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);

  console.log("customers", customers);
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
    //setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },

    {
      field: "isAdmin",
      headerName: "Admin",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>

            <DeleteOutlineOutlined
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </Fragment>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={customers}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
