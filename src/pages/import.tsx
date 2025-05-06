import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import converter from "xml-js";

const Import = () => {
  const [data, setData] = useState<any>(null);
  const [isArray, setIsArray] = useState<boolean>(false)
  const [isData, setIsData] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setIsArray(data.datasets.length > 1)
    }
  }, [data])

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
          const dane = JSON.parse(content as string)
          setData(dane)
          setIsData(true)
        } else if (file.type === "application/xml" || file.name.endsWith(".xml")) {
          const dane: any = converter.xml2js(content as string, { compact: true })
          console.log(dane)
          const daneToSet = {
            labels: dane.root.labels.map((row: any) => {
              return row.label._text
            }),
            datasets: Array.isArray(dane.root.datasets) ? dane.root.datasets.map((dataset: any, index: any) => {
              setIsArray(true)
              return {
                data: dataset.dataset.data.map((row: any) => {
                  return row.data._text
                }),
                label: dataset.dataset.label._text,
                borderWidth: dataset.dataset.borderWidth._text,
                yAxisID: index === 0 ? "y" : "y1"
              }
            }) : [
              {
                data: dane.root.datasets.dataset.data.map((row: any) => {
                  setIsArray(false)
                  return row.data._text
                }),
                label: dane.root.datasets.dataset.label._text,
                borderWidth: dane.root.datasets.dataset.borderWidth._text,
              }
            ]
          }
          setData(daneToSet)
          setIsData(true)
        } else {
          alert("Unsupported file type. Please upload a JSON or XML.")
        }
      } catch (error) {
        console.error("Error reading file:", error)
        alert("Error reading file. Please ensure it is a valid JSON or XML.")
      }
    }
    reader.readAsText(file)
  }

  console.log(isArray)

  return (
    <div className="flex flex-grow px-20 mx-20 w-full justify-center">
      <div className="flex flex-col border-2 rounded-lg p-4 w-full">
        <div className="flex flex-col items-center space-y-6">
          <label className="flex flex-col items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            <span className="text-lg font-semibold">Upload File</span>
            <input
              type="file"
              accept=".json,.xml"
              onChange={handleDataUpload}
              className="hidden"
            />
          </label>
          {isData ? (
            <div className="w-full max-w-4xl flex justify-center items-center shadow-lg rounded-lg p-4">
              {isArray ? (
                <Bar data={data} options={{
                  responsive: true,
                  scales: {
                    y: {
                      type: "linear",
                      position: "left",
                      title: {
                        display: true,
                        text: "Scale for Infected Dataset",
                      },
                    },
                    y1: {
                      type: "linear",
                      position: "right",
                      title: {
                        display: true,
                        text: "Scale for Transport Dataset",
                      },
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  },
                }} />
              ) : (
                <Bar data={data} options={{
                  responsive: true,
                  scales: {
                    y: {
                      type: "linear",
                      position: "left",
                      title: {
                        display: true,
                        text: "Scale for Infected Dataset",
                      },
                    },
                  },
                }} />
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No data uploaded yet. Please upload a JSON or XML file.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Import;