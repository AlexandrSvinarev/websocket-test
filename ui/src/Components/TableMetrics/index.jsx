import React, { useReducer, useMemo } from "react";
import useConnectWS from "../../util/useConnectWS";
import { initialState, reducer, getStyleCell } from "./Utils";

import "./styles.css";

function TableMetrics() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const statusConnectWS = useConnectWS((payload) => {
    dispatch({ type: "showData", payload });
  });

  const tableRows = useMemo(() => {
    return Object.keys(state.payload);
  }, [state.payload.length]);

  const setTypeResult = (type) => {
    dispatch({ type: "setTypeResult", payload: type });
  };

  return (
    <>
      <table className="TableMetrics">
        <thead>
          <tr>
            <th>Поле</th>
            <th colSpan={9}>Тип</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              {Array.isArray(state.payload[key]) &&
                state.payload[key].map((entity, i) => (
                  <td key={`row_${key}_cell_${i}`} style={getStyleCell(entity)}>
                    {entity}
                  </td>
                ))}
            </tr>
          ))}
          <tr>
            <td>Итого:</td>
            {Array.isArray(state.result) &&
              state.result.map((number, i) => (
                <td key={`result_${i}`} style={getStyleCell(number)}>
                  {number || "-"}
                </td>
              ))}
          </tr>
        </tbody>
      </table>
      <div>Status WS: {statusConnectWS}</div>
      <div>Type: {state.typeResult}</div>
      <div>
        {["sum", "min", "max", "avg"].map((type) => (
          <button
            key={type}
            onClick={() => setTypeResult(type)}
            disabled={state.typeResult === type}
            className="TableMetrics__buttonChangeOperation"
          >
            {type}
          </button>
        ))}
      </div>
    </>
  );
}

export default TableMetrics;
