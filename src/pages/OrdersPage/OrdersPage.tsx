import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import OrderCard from '../../components/OrderCard';

import SortRadio from '../../components/SortRadio';
import { getOrders } from '../../services/api';
import { Order, OrderStatus } from '../../types/types';
import SelectBar from '../../components/SelectBar';
import './OrdersPage.css';

const statusOptions = Object.entries(OrderStatus).map(([key, value]) => ({
  label: key,
  value: value.toString(),
}));

const OrdersPage: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [sortedOrders, setSortedOrders] = useState<Order[]>([]);
  const [sortType, setSortType] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<number[]>([]);

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

  // Filtering

  useEffect(() => {
    let filteredOrders = [...allOrders];

    if (statusFilter.length > 0) {
      filteredOrders = filteredOrders.filter((order) => statusFilter.includes(order.status));
    }

    if (sortType === 1) {
      filteredOrders = filteredOrders.sort((a, b) => a.total - b.total);
    } else if (sortType === 2) {
      filteredOrders = filteredOrders.sort((a, b) => b.total - a.total);
    }

    setSortedOrders(filteredOrders);
  }, [sortType, allOrders, statusFilter]);

  return (
    <section>
      <div className="order-controls">
        <SortRadio onSortChange={setSortType} />
        <SelectBar options={statusOptions} onChange={(values) => setStatusFilter(values.map(Number))} />
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
