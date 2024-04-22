'use client';
import { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface Option {
  id: number;
  name: string;
  value: string;
}

interface ListBoxProps {
  options: Option[];
  onSelection: (val: Option) => void;
}

export const Dropdown = ({ options, onSelection }: ListBoxProps) => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  return (
    <Listbox
      value={selectedOption}
      onChange={(value) => {
        setSelectedOption(value);
        onSelection(value);
      }}
    >
      <div className="relative">
        <Listbox.Button className=" w-full cursor-default border border-gray-400 bg-blue text-white py-2 pl-5 pr-7 transition duration-150 ease-in-out md:border-0">
          <span className="block">{selectedOption.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Listbox.Button>

        <Transition
          enter="transition duration-500 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-500 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <div className="absolute mt-1 w-full bg-white shadow-lg">
            <Listbox.Options className="shadow-xs max-h-60 overflow-auto py-1 text-base">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  value={option}
                  className="py-2 px-5 hover:bg-blue hover:text-white"
                >
                  {option.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Transition>
      </div>
    </Listbox>
  );
};
