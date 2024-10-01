import { useController } from 'react-hook-form';

const SelectOption = ({
  name,
  control,
  options,
  defaultSelect,
  label,
  className,
}: {
  name: string;
  control: any;
  options: { value: string; label: string }[];
  defaultSelect: string;
  label?: string;
  className?: string;
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultSelect,
  });

  return (
    <div className="flex-grow">
      {label && (
        <label className="block text-sm font-bold text-gray-700">{label}</label>
      )}
      <div className={`${className}`}>
        <select
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          value={value}
          className="w-full rounded bg-gray-400 px-2 py-[10px] outline-none"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="mt-1 text-sm text-red-600">{error.message}</span>
        )}
      </div>
    </div>
  );
};

export default SelectOption;
