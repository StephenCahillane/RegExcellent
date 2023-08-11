import React, { useEffect, useState } from "react";

export default function Sliding() {

  const [data, setData] = useState([[]]);
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState(10);
  const [bottom, setBottom] = useState(0);
  const [left, setLeft] = useState(0);
  const [height, setHeight] = useState(5);
  const [width, setWidth] = useState(5);



  useEffect(() => {
    //   setData(
    //     new Array(rows)
    //       .fill(undefined)
    //       .map((_, row) => new Array(columns).fill(undefined).map((_, column) => row * column))
    //   );
    // }, [rows, columns]);
    function cell(row, col) {
      let trap = undefined;
      if (col % 3 === 0) {
        trap = "trap1";
      }
      return { row: row, col: col, trap: trap };
    }
    setData(new Array(10).fill(undefined).map((_, row) => new Array(5).fill(undefined).map((_, col) => cell(row, col)
    )))
  }, [rows, columns])







  const handleManualSlide = () => {
    if (left + width < columns) {
      setLeft(left => left + 1);
    } else {
      setLeft(0);
      if (bottom + height < rows) {
        setBottom(bottom => bottom + 1);
      } else {
        setBottom(0);
      }
    }
  };

  return (
    <div>
      <Knob getter={rows} setter={setRows} text="Row" />
      <Knob getter={columns} setter={setColumns} text="Columns" />
      <Knob getter={bottom} setter={setBottom} text="Bottom" />
      <Knob getter={left} setter={setLeft} text="Left" />
      <Knob getter={height} setter={setHeight} text="Height" />
      <Knob getter={width} setter={setWidth} text="Width" />
      <button onClick={handleManualSlide}>Slide Manually</button>
      <table border={1}>
        <tbody>
          {data.slice(bottom, bottom + height).map((dataRow, rowIdx) => (
            <tr key={`Row${bottom + rowIdx}`}>
              {dataRow.slice(left, left + width).map((cell, columnIdx) => (
                <td key={`Col${left + columnIdx}`}>
                  {JSON.stringify(cell)}{/*component*/}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Knob({ getter, setter, text }) {
  return (
    <>
      <button onClick={() => setter((n) => (n > 0 ? n - 1 : 0))}>--</button>
      {text}: {getter}
      {<button onClick={() => setter((n) => n + 1)}>++</button>}
      <br />
    </>
  );
}
