import React, { useState, useMemo, useCallback } from 'react';

import Row from './components/Row';

interface IRow {
    name: string
    value: number
}

const App: React.FC = () => {
    const [rows, setRows] = useState<IRow[]>([]);
    const [newRowName, setNewRowName] = useState('');

    const totalValue = useMemo(() => {
        return rows.reduce((sum: number, row: IRow) => sum + row.value, 0);
    }, [rows]);

    const handleCreateRow = (): void => {
        if (newRowName.length !== 0 && newRowName.length <= 10 && totalValue <= 100) {
            setRows((prevRows) => [
                ...prevRows,
                { name: newRowName, value: 0 },
            ]);
            setNewRowName('');
        }
    };

    const handleDeleteRow = useCallback(
    (index: number) => {
        setRows((prevRows) => {
            const updatedRows = prevRows.filter((_, i) => i !== index);
            return updatedRows;
        });
    },
    [setRows, totalValue, newRowName]
    );

    const handleValueChange = (index: number, newValue: number): void => {
        const diff: number = newValue - rows[index].value;
        const newTotalValue: number = totalValue + diff;
        if (newTotalValue <= 100) {
            setRows((prevRows: IRow[]) => {
                const updatedRows: IRow[] = [...prevRows];
                updatedRows[index].value = newValue;
                return updatedRows;
            });
        }
    };

    return (
        <div>
            <h1>Total: {totalValue}</h1>
            <input
                type="text"
                placeholder="Row Name (max 10 characters)"
                value={newRowName}
                style={{ width: "10%" }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewRowName(event.target.value)}
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
                        key={index}
                        name={row.name}
                        value={row.value}
                        onDelete={() => handleDeleteRow(index)}
                        onValueChange={(newValue) => handleValueChange(index, newValue)}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;