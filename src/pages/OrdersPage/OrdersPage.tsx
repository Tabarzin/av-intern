import { Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../../components/OrderCard';

import SortRadio from '../../components/SortRadio';
import { getOrders } from '../../services/api';
import { Order } from '../../types/types';
import './OrdersPage.css';

const OrdersPage: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
  const [sortType, setSortType] = useState<number>(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setAllOrders(fetchedOrders);
        setSortedOrders(fetchedOrders);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    fetchOrders();
  }, []);

  // Sorting
  useEffect(() => {
    let sorted = [...allOrders];

    if (sortType === 1) {
      // по возрастанию
      sorted = sorted.sort((a, b) => a.total - b.total);
    } else if (sortType === 2) {
      // по убыванию
      sorted = sorted.sort((a, b) => b.total - a.total);
    }

    setSortedOrders(sorted);
  }, [sortType, allOrders]);

  return (
    <section>
      <div className="order-controls">
        <SortRadio onSortChange={setSortType} />
      </div>
      <Row gutter={[32, 32]}>
        {sortedOrders.map((order) => (
          <Col span={8} key={order.id}>
            <OrderCard order={order} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default OrdersPage;
