import React, { useRef, useState } from 'react';
import clsx from 'clsx';

interface SelectOption {
  value: string;
  label: string | React.ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(option => option.value === value);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div ref={selectRef} className={clsx('relative', className)}>
      <button
        type="button"
        className={clsx(
          'w-full px-3 py-2 text-left bg-white border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
          'flex items-center justify-between'
        )}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={clsx(value ? 'text-neutral-900' : 'text-neutral-500')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={clsx('h-5 w-5 text-neutral-400 transition-transform', isOpen && 'transform rotate-180')}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={clsx(
                'cursor-default select-none relative py-2 pl-3 pr-9',
                option.value === value ? 'text-primary-900 bg-primary-100' : 'text-neutral-900'
              )}
              role="option"
              onClick={() => handleSelectOption(option.value)}
            >
              <span className={clsx('block truncate', option.value === value && 'font-semibold')}>
                {option.label}
              </span>
              {option.value === value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600">
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
