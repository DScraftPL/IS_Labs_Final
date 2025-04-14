import React from "react";
import { useMemo } from "react";
import chartDataOptions from "../data/chartdatapickeroptions";

const ChartDataPicker = (props: {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const options = useMemo(() => chartDataOptions, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelected(e.target.value);
  };

  return (
    <>
      {options.map((option, index) => {
        return (
          <div className="flex flex-row" key={index}>
            <input
              type="radio"
              id={option.value}
              name="chartdatapicker"
              value={option.value}
              onChange={handleChange}
              checked={props.selected === option.value}
            />
            <label htmlFor={option.label}>{option.label}</label>
          </div>
        );
      })}
    </>
  );
};

export default ChartDataPicker;
