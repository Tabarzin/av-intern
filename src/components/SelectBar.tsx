import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';
import React from 'react';

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
      placeholder="Выберите критерий"
      defaultValue={[]}
      onChange={onChange}
      options={options}
    />
  </Space>
);

export default SelectBar;
