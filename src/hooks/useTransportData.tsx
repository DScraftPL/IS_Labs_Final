import { useEffect, useState } from "react"
import { useAuth } from "../context/authContext";
import authService from "../services/authService";

const useTransportData = (props: {
  startDate: string;
  endDate: string;
  type: string
}) => {
  const { state } = useAuth()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    setLoading(true);
    authService.fetchWithAuth("http://localhost:3000/api/transport/", {
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
        const labels: any = [];
        const datasets: any = [
          {
            label: props.type,
            data: [],
            borderWidth: 1,
          },
        ];
        //console.log(response)
        if (Array.isArray(response)) {
          response.forEach((row: any) => {
            const data = row.date.split(" ")[0];
            labels.push(data.split("/")[2] + "-" + data.split("/")[0]);
            datasets[0].data.push(row[props.type]);
          });
        } else {
          console.error("Unexpected response format:", response);
        }
        const data = {
          labels: labels,
          datasets: datasets,
        };
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [props.startDate, props.endDate, props.type]);
  return { data, loading }
}

export default useTransportData