import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext";

const useInfectedData = (props: {
  startDate: string;
  endDate: string;
  type: string
}) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  const { state } = useAuth()

  useEffect(() => {
    setLoading(true)
    console.log("Fetching infected data...")
    fetch("http://localhost:3000/api/who/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user?.token}`,
      },
      body: JSON.stringify({
        dateStart: parseInt(props.startDate),
        dateEnd: parseInt(props.endDate),
        [props.type]: 1,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const monthly: { [key: string]: number } = {};
        if(props.startDate === "2019"){
          monthly["2019-01"] = 0
          monthly["2019-02"] = 0
          monthly["2019-03"] = 0
          monthly["2019-04"] = 0
          monthly["2019-05"] = 0
          monthly["2019-06"] = 0
          monthly["2019-07"] = 0
          monthly["2019-08"] = 0
          monthly["2019-09"] = 0
          monthly["2019-10"] = 0
          monthly["2019-11"] = 0
          monthly["2019-12"] = 0
        }
        const labels: any = [];
        const datasets: any = [
          {
            label: props.type,
            data: [],
            borderWidth: 1,
          },
        ]
        if (Array.isArray(response)) {
          response.forEach((row: any) => {
            const data = row.dateReported.split(" ")[0]
            const month = data.split("-")[0] + "-" + data.split("-")[1]
            if (!monthly[month]) {
              monthly[month] = 0
            }
            monthly[month] += row[props.type]
          });
          Object.keys(monthly).forEach((key) => {
            labels.push(key)
            datasets[0].data.push(monthly[key])
          })
        } else {
          console.error("Unexpected response format:", response)
        }
        const data = {
          labels: labels,
          datasets: datasets,
        };
        setData(data)
        setLoading(false)
      })

      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [props.startDate, props.endDate, props.type])

  return { data, loading }
} 

export default useInfectedData