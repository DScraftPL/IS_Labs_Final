const DatePicker = (props: {
  name: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}) => {
  const dates = [
    '2019',
    '2020',
    '2021',
    '2022',
    '2023'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.setValue(e.target.value)
  }

  return (<div className="flex flex-col space-y-2">
    <label
      htmlFor={props.name}
      className="text-sm font-medium text-gray-700"
    >
      Choose {props.name} date:
    </label>
    <select
      name={props.name}
      id={props.name}
      value={props.value}
      onChange={handleChange}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {dates.map((el, index) => (
        <option value={el} key={index}>
          {el}
        </option>
      ))}
    </select>
  </div>)
}

export default DatePicker