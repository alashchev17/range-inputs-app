import React from 'react';

interface InputRangeProps {
    initialValue: number;
    onChange: (value: number) => void;
}

const InputRange: React.FC<InputRangeProps> = ({ initialValue, onChange }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onChange(parseInt(event.target.value, 10));
    }

    return (
        <input type="range" min={0} max={100} value={initialValue} onChange={handleChange} />
    );
};

export default InputRange;
