import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <header className="header">
      <Title level={1}>Личный кабинет</Title>
      <ul className="header-ul">
        <li>
          <Link to="/" className="header-link">
            <Title level={3}>Все объявления</Title>
          </Link>
        </li>
        <li>
          <Link to="/orders" className="header-link">
            <Title level={3}>Все заказы</Title>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
