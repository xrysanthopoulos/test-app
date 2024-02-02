import React, { useState, useEffect } from 'react';
import PropertiesStyle from '../styles/Properties.module.css';
import Filters from '../components/Filters';
import Card from '../components/Card';
import SelectStyle from '../styles/Select.module.css';

const Properties: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState('Δημοφιλή');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sortData = (option: string) => {
    let sortedArray = [...data];
    switch (option) {
      case 'Δημοφιλή':
        sortedArray.sort((a, b) => b.rating - a.rating);
        break;
      case 'Αύξουσα':
        sortedArray.sort((a, b) => a.price - b.price);
        break;
      case 'Αλφαβητικά':
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    setSortedData(sortedArray);
  };

  useEffect(() => {
    sortData(selectedOption);
  }, [selectedOption, data, sortData]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className={PropertiesStyle.page}>
      <div className={PropertiesStyle.container}>
        <div className={PropertiesStyle.filters}>
          <Filters />
        </div>
        <div className={PropertiesStyle.main}>
          <div className={PropertiesStyle.topBar}>
            <div className={PropertiesStyle.leftText}>
              139 <span>διαθέσιμα πακέτα διακοπών</span>
            </div>
            <Select selectedOption={selectedOption} handleOptionClick={handleOptionClick} />
          </div>
          <div className={PropertiesStyle.grid}>
            {sortedData.length > 0 ? (
              sortedData.map((item, index) => (
                <Card key={index} data={item} />
              ))
            ) : (
              <div>No data available</div>
            )}
          </div>
          <div className={PropertiesStyle.moreButton}>
            Δείτε περισσότερα (127)
          </div>
        </div>
      </div>
    </div>
  );
}

export default Properties;

const Select: React.FC<{ selectedOption: string; handleOptionClick: (option: string) => void }> = ({
  selectedOption,
  handleOptionClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Δημοφιλή', 'Φθίνουσα', 'Αλφαβητικά'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={SelectStyle.selectContainer}>
      <div className={SelectStyle.select} onClick={toggleDropdown}>
        {selectedOption}
      </div>
      {isOpen && (
        <div className={SelectStyle.selectList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={SelectStyle.selectOption}
              onClick={() => {
                handleOptionClick(option);
                toggleDropdown();
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
