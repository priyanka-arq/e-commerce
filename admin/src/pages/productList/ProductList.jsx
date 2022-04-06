import { Fragment, default as React } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
    // setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      // use renderCell to create column with params
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img src={params.row.img} alt="" className="productListImg" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "inStock",
      headerName: "Stock",
      width: 200,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 130,
    // },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>

            <DeleteOutlineOutlined
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </Fragment>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
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
