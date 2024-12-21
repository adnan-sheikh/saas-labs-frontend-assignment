import { useState } from "react";
import data from "../frontend-assignment.json";
import { filterColumns, getColumns, parseText } from "./utils/index";
import { Pagination } from "./components";
import "./styles.css";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const allColumns = getColumns(data);
  const requiredColumns = filterColumns(allColumns, [
    "s.no",
    "amt.pledged",
    "percentage.funded",
  ]);

  const indexOfLastRecord = currentPage * pageSize;
  const indexOfFirstRecord = indexOfLastRecord - pageSize;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {requiredColumns.map((col) => (
              <th key={col}>{parseText(col)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <tr key={item["s.no"]}>
              {requiredColumns.map((col) => (
                <td key={col}>
                  {col === "amt.pledged"
                    ? `$${item[col].toLocaleString()}`
                    : col === "percentage.funded"
                    ? `${item[col]}%`
                    : item[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        total={data.length}
        current={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
}

export default App;
