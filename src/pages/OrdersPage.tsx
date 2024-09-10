import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import { getOrders } from '../services/api';
import { Order } from '../types/types';

const OrdersPage: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);

  console.log(allOrders, 'ORDERS');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setAllOrders(fetchedOrders);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    fetchOrders();
  }, []);

  return (
    <section>
      <Row gutter={16}>
        {allOrders.map((order) => (
          <Col span={8} key={order.id}>
            <OrderCard order={order} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default OrdersPage;
