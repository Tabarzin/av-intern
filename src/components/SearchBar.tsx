import React, { useCallback, useState } from 'react';
import { Input } from 'antd';
import { Advertisment } from '../types/types';
import debounce from 'lodash/debounce';

const { Search } = Input;

interface SearchBarProps {
  allAds: Advertisment[];
  setShownAds: (ads: Advertisment[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ allAds, setShownAds }) => {
  const [searchItem, setSearchItem] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const filteredAds = allAds.filter((ad) =>
        ad.name ? ad.name.toLowerCase().includes(value.toLowerCase()) : false,
      );
      setShownAds(filteredAds);
    }, 300),
    [allAds, setShownAds],
  );

  const handleSearch = (value: string) => {
    setSearchItem(value);
    if (value.length >= 3) {
      debouncedSearch(value);
    } else {
      setShownAds(allAds);
    }
  };

  return (
    <Search
      placeholder="Введите слово для поиска"
      value={searchItem}
      onChange={(e) => handleSearch(e.target.value)}
      enterButton="Search"
      size="large"
      style={{ width: '800px' }}
    />
  );
};

export default SearchBar;
