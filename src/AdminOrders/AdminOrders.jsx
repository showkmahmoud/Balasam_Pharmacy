import React, { useEffect, useState } from "react";
import { handleFetchOrders } from "../firebase/order";
import { Table } from "reactstrap";
import './AdminOrders.css'

const AdminOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    if (user.currentUser) {
      const data = await handleFetchOrders();
      setOrders(data);
    }
  }, [orders]);

  const renderTableData = () => {
    return orders.map((order) => {
      const { date, userId, userName, orderID } = order;
      return (
        <tr key={orderID}>
          <td>{userName}</td>
          <td>{userId}</td>
          <td>
            <ul className="list-unstyled">
              {order.cart.map((item) => {
                const { productName, quantity, documentID } = item;
                return (
                  <li key={documentID}>
                    {productName} × {quantity}{" "}
                  </li>
                );
              })}
            </ul>
          </td>

          <td>
            $
            {order.cart.reduce((prev, item) => {
              return prev + item.quantity * item.productPrice;
            }, 0)}
          </td>

          <td>{date}</td>
        </tr>
      );
    });
  };
  return (
    <div className="mt-5 orders_history pt-5">
      {user.currentUser && orders && orders.length ? (
        <div className="container">
          <div className="d-flex justify-content-between align-items-center my-4">
            <h3
              className="mb-4 w-25 mx-auto section_title"
            >
              ALL orders
            </h3>
          </div>
        <div className='table-responsive'>
          <Table className="text-center">
            <thead>
              <tr>
                <th>userName</th>
                <th>user ID</th>
                <th>order</th>
                <th>order cost</th>
                <th>order date</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </Table>
        </div>
        </div>
      ) :null }

    </div>
  );
};


export default AdminOrders
