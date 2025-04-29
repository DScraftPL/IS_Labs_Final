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
    <div className="flex flex-col justify-start border-2 border-gray-300 rounded-lg p-4 space-y-2">
      {options.map((option, index) => {
        return (
          <div className="space-x-2" key={index}>
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
    </div>
  );
};

export default ChartDataPicker;
