import React from "react";

interface InputRangeProps {
  initialValue: number;
  index: number;
  onChange: (index: number, value: number) => void;
}

const InputRange: React.FC<InputRangeProps> = ({
  index,
  initialValue,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(index, parseInt(event.target.value, 10));
  };

  return (
    <input
      type="range"
      min={0}
      max={100}
      value={initialValue}
      onChange={handleChange}
    />
  );
};

export default InputRange;
