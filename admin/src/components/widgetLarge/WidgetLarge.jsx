import React from "react";
import "./widgetLarge.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../networkRequest";
import { format } from "timeago.js";

const Button = ({ type }) => {
  return <button className={"widgetLargeBtn " + type}>{type}</button>;
};
export default function WidgetLarge() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="widgetLarge">
      <h3 className="widgetLargeTitle">Latest Transactions</h3>
      <table className="widgetLargeTable">
        <tr className="widgetLargeTr">
          <th className="widgetLargeTh">Customer</th>
          <th className="widgetLargeTh">Date</th>
          <th className="widgetLargeTh">Amount</th>
          <th className="widgetLargeTh">Status</th>
        </tr>
        {orders.map((order) => (
          <tr className="widgetLargeTr" key={order._id}>
            <td className="widgetLargeUser">
              <span className="widgetLargeName">{order.userId}</span>
            </td>
            <td className="widgetLargeDate">{format(order.createdAt)}</td>
            <td className="widgetLargeAmount">{order.amount}</td>
            <td className="widgetLargeStatus">
              <Button type={order.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
