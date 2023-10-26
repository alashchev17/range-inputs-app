import React from "react";
import InputRange from "./InputRange";

interface RowProps {
  name: string;
  index: number;
  value: number;
  onDelete: (arg: number) => void;
  onValueChange: (index: number, value: number) => void;
}

const Row: React.FC<RowProps> = ({
  index,
  name,
  value,
  onDelete,
  onValueChange,
}) => {
  const onDeleteRow = () => {
    onDelete(index);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <InputRange
          index={index}
          initialValue={value}
          onChange={onValueChange}
        />
      </td>
      <td>{value}</td>
      <td>
        <button onClick={onDeleteRow}>Delete</button>
      </td>
    </tr>
  );
};

export default React.memo(Row);
