import React from "react"

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

  return (<div>
    <label htmlFor={props.name}>Choose {props.name} date: </label>
    <select name={props.name} id={props.name} onChange={handleChange}>
      {dates.map((el, index) => {
        return <option value={el} key={index}>{el}</option>
      })}
    </select>
  </div>)
}

export default DatePicker