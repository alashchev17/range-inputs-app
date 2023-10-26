import React from 'react';
import InputRange from './InputRange';

interface RowProps {
    name: string;
    value: number;
    onDelete: () => void;
    onValueChange: (value: number) => void;
}

const Row: React.FC<RowProps> = ({ name, value, onDelete, onValueChange }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>
                <InputRange initialValue={value} onChange={onValueChange} />
            </td>
            <td>{value}</td>
            <td>
                <button onClick={onDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default Row;