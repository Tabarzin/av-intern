import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];

interface SelectBarProps {
  options: SelectProps['options'];
  onChange: (value: string[]) => void;
}

const SelectBar: React.FC<SelectBarProps> = ({ options, onChange }) => (
  <Space style={{ width: '100%' }} direction="vertical">
    <Select
      mode="multiple"
      allowClear
      style={{ width: '800px' }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={onChange}
      options={options}
    />
  </Space>
);

export default SelectBar;
