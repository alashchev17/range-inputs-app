import React, { useState, useMemo, useCallback } from "react";

import Row from "./components/Row";

interface IRow {
  name: string;
  value: number;
}

const App: React.FC = () => {
  const [rows, setRows] = useState<IRow[]>([]);
  const [newRowName, setNewRowName] = useState("");

  const totalValue = useMemo(() => {
    return rows.reduce((sum: number, row: IRow) => sum + row.value, 0);
  }, [rows]);

  const handleCreateRow = (): void => {
    if (
      newRowName.length !== 0 &&
      newRowName.length <= 10 &&
      totalValue <= 100
    ) {
      setRows((prevRows) => [...prevRows, { name: newRowName, value: 0 }]);
      setNewRowName("");
    }
  };

  const handleDeleteRow = useCallback(
    (index: number) => {
      setRows((prevRows) => {
        return prevRows.filter((_, i) => i !== index);
      });
    },
    [setRows],
  );

  const handleValueChange = useCallback(
    (index: number, newValue: number): void => {
      setRows((prevRows: IRow[]) => {
        const totalWithoutIndex: number = prevRows
          .filter((_, i) => i !== index)
          .map((item) => item.value)
          .reduce((prev, next) => prev + next, 0);

        const maxValue = 100 - totalWithoutIndex;
        const newRows: IRow[] = structuredClone(prevRows);
        newRows[index].value = newValue <= maxValue ? newValue : maxValue;
        return newRows;
      });
    },
    [setRows],
  );

  return (
    <div>
      <h1>Total: {totalValue}</h1>
      <input
        type="text"
        placeholder="Row Name (max 10 characters)"
        value={newRowName}
        style={{ width: "10%" }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setNewRowName(event.target.value)
        }
      />
      <button onClick={handleCreateRow}>Create</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Range</th>
            <th>Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row: IRow, index: number) => (
            <Row
              index={index}
              key={index}
              name={row.name}
              value={row.value}
              onDelete={handleDeleteRow}
              onValueChange={handleValueChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
