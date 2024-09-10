import { Col, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import SelectBar from '../components/SelectBar';
import SortRadio from '../components/SortRadio';
import { getOrders } from '../services/api';
import { Order } from '../types/types';

const OrdersPage: React.FC = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
  const [sortType, setSortType] = useState<number>(1);

  const orderOptions = [
    { value: 'order.status', label: 'status' },
    { value: 'order.finishedAt', label: 'Finished' },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setAllOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...allOrders];

      //   selectedFilter.forEach((filter) => {
      //     if (filter === 'status') {
      //       filtered = filtered.filter((order) => order.status === '0');
      //     if (filter === 'finishedAt') {
      //       filtered = filtered.filter((order) => order.finishedAt);
      //     }
      //     if (filter === 'unfinished') {
      //       filtered = filtered.filter((order) => !order.finishedAt);
      //     }
      //   });

      setFilteredOrders(filtered);
    };

    applyFilters();
  }, [selectedFilter, allOrders]);

  // Sorting

  useEffect(() => {
    let sortedOrders = [...allOrders];

    if (sortType === 1) {
      // по возрастанию
      sortedOrders = sortedOrders.sort((a, b) => a.total - b.total);
    } else if (sortType === 2) {
      // по убыванию
      sortedOrders = sortedOrders.sort((a, b) => b.total - a.total);
    }

    setFilteredOrders(sortedOrders);
  }, [sortType, allOrders]);

  return (
    <section>
      <SelectBar options={orderOptions} />
      <SortRadio onSortChange={setSortType} />
      <Row gutter={16}>
        {filteredOrders.map((order) => (
          <Col span={8} key={order.id}>
            <OrderCard order={order} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default OrdersPage;
