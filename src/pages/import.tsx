import { useState } from 'react'
import { Bar } from "react-chartjs-2";

const Import = () => {
  const [data, setData] = useState<any>(null);
  const [isData, setIsData] = useState<boolean>(false);

  const handleDataUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result
        if (file.type === "application/json") {
          const json = JSON.parse(content as string)
          setData(json)
          setIsData(true)
        } else {
          alert("Unsupported file type. Please upload a JSON.")
        }
      } catch (error) {
        console.error("Error reading file:", error)
        alert("Error reading file. Please ensure it is a valid JSON.")
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="flex flex-grow px-20 mx-20 w-full">
      <div className="flex border-2 rounded-lg p-4 w-full">
        <input
          type="file"
          accept=".json,.xml"
          onChange={handleDataUpload}
          className="border-2 border-gray-300 p-2 rounded"
        />
        {isData && (
          <Bar data={data} />
        )}
      </div>
    </div>
  )
}

export default Import;