import React from "react";
import InputRange from "./InputRange";

interface RowProps {
  name: string;
  index: number;
  value: number;
  onDelete: (arg: number) => void;
  onValueChange: (index: number, value: number) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
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

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Row);
