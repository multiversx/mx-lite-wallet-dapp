import { useEffect, useState } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataTestIdsEnum } from 'localConstants';
import { Button } from '../Button';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownPropsType {
  initialOption: DropdownOption;
  onSelectOption: (option: DropdownOption) => void;
  options: DropdownOption[];
}

export const Dropdown = ({
  initialOption,
  onSelectOption,
  options
}: DropdownPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  useEffect(() => {
    setSelectedOption(initialOption.label);
  }, [initialOption]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: DropdownOption) => () => {
    setSelectedOption(option.label);
    onSelectOption(option);
    toggleDropdown();
  };

  return (
    <div className='relative inline-block text-left'>
      <Button
        aria-expanded='true'
        aria-haspopup='true'
        className='flex flex-row flex-nowrap items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
        data-testid={DataTestIdsEnum.activeNetwork}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <FontAwesomeIcon className='-mr-1 ml-2' icon={faChevronDown} />
      </Button>

      {isOpen && (
        <div
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
          role='menu'
          aria-orientation='vertical'
          aria-labelledby='menu-button'
          tabIndex={-1}
        >
          <div className='py-1' role='none'>
            {options.map((option, index) => (
              <Button
                className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                data-testid={option.value}
                key={`${option.value}-${index}`}
                onClick={handleSelectOption(option)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
