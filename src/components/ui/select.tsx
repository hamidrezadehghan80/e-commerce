import React from "react";
import { cn } from "../../libs/utils";

export interface ISelectOption {
  value: string;
  label: string;
}

interface ISelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: ISelectOption[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  className,
}: ISelectProps) {
  return (
    <div className={cn("w-fit", className)}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <div className="relative w-fit">
        <select
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onChange(e.target.value)
          }
          className="min-w-64 bg-white px-3 py-2 pr-10 transition-all cursor-pointer border border-neutral-200 rounded-lg focus:outline-none focus:border focus:border-neutral-200"
        >
          {placeholder && (
            <option
              value=""
              disabled
              hidden
              className="!text-sm hover:bg-neutral-100"
            >
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-sm hover:bg-neutral-100 !cursor-pointer"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
