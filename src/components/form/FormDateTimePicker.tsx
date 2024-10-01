'use client';

import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext, Controller, FieldError } from 'react-hook-form';
import { FaCalendar } from 'react-icons/fa6';

interface DateTimePickerProps {
  name: string;
  label?: string;
  withTime?: boolean;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormDateTimePicker = ({
  name,
  label,
  withTime = false,
  className,
  placeholder,
  required = false,
  disabled,
}: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors[name] as FieldError)?.message;

  return (
    <div className="flex-grow">
      <label className="mb-1 block font-semibold">
        {label ? label : null}
        {required ? <span className="">*</span> : null}
      </label>
      <div className={`${className}`}>
        <div className="relative pb-[3px]">
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <ReactDatePicker
                selected={value ? new Date(value) : null}
                onChange={(date) => onChange(date)}
                onBlur={onBlur}
                showTimeSelect={withTime}
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={withTime ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'}
                placeholderText={placeholder}
                required={required}
                disabled={disabled}
                className="w-full border-none bg-slate-600 focus:outline-none"
                ref={ref}
                open={open}
                onInputClick={() => setOpen(true)}
                onSelect={() => setOpen(false)}
                onClickOutside={() => setOpen(false)}
                popperPlacement="bottom-start"
              />
            )}
          />
          <span className="absolute right-0 top-1">
            <FaCalendar
              onClick={() => setOpen(!open)}
              className="cursor-pointer text-gray-200"
            />
          </span>
        </div>
        {errorMessage && (
          <span className="mt-1 text-sm text-red-600">{errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export default FormDateTimePicker;
