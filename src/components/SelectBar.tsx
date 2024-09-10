import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

interface SelectBarProps {
  options: SelectProps['options'];
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const SelectBar: React.FC<SelectBarProps> = ({ options }) => (
  <Space style={{ width: '100%' }} direction="vertical">
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={handleChange}
      options={options}
    />
  </Space>
);

export default SelectBar;
