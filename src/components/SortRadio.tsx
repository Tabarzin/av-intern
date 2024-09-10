import React, { useState } from 'react';
import { Radio, Input, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';

interface SortRadioProps {
  onSortChange: (sortType: number) => void;
}

const SortRadio: React.FC<SortRadioProps> = ({ onSortChange }) => {
  const [value, setValue] = useState<number>(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    onSortChange(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={1}>Сортировать по цене: по возрастанию</Radio>
        <Radio value={2}>Сортировать по цене: по убыванию</Radio>
      </Space>
    </Radio.Group>
  );
};

export default SortRadio;
