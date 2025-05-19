import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import authService from "../services/authService";
import transportChartDataOptions from "../data/transportchartdatapickeroptions";
import infectedChartDataOptions from "../data/infectedchartdatapickeroptions";
import { useAuth } from "../context/authContext";
import DatePicker from "../components/pickers/datepicker";

const Admin = () => {
  const [infectedData, setInfectedData] = useState<any>(null);
  const [isInfectedData, setIsInfectedData] = useState<any>(null);
  const [transportData, setTransportData] = useState<any>(null);
  const [isTransportData, setIsTransportData] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [checkedItemsTransport, setCheckedItemsTransport] = useState<any>([]);
  const [checkedItemsInfected, setCheckedItemsInfected] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>("2020");
  const [endDate, setEndDate] = useState<string>("2021");

  const { state } = useAuth();

  const getLabelByValueTransport = (value: string) => {
    const label = transportChartDataOptions.find((item) => item.value === value);
    return label ? label.label : value;
  }

  const getLabelByValueInfected = (value: string) => {
    const label = infectedChartDataOptions.find((item) => item.value === value);
    return label ? label.label : value;
  }

  const getInfectedGroup = (value: string) => {
    const label = infectedChartDataOptions.find((item) => item.value === value);
    return label ? label.group : value;
  }

  const getTransportGroup = (value: string) => {
    const label = transportChartDataOptions.find((item) => item.value === value);
    return label ? label.group : value;
  }

  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    setLoading(true);
    setIsInfectedData(false);
    setIsTransportData(false);
    const transportBody: any = {
      dateStart: parseInt(startDate),
      dateEnd: parseInt(endDate),
    }
    checkedItemsTransport.forEach((item: any) => {
      transportBody[item] = 1;
    });
    const infectedBody: any = {
      dateStart: parseInt(startDate),
      dateEnd: parseInt(endDate),
    }
    checkedItemsInfected.forEach((item: any) => {
      infectedBody[item] = 1;
    });
    authService.fetchWithAuth("http://localhost:3000/api/transport/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user?.token}`,
      },
      body: JSON.stringify(transportBody),
    })
      .then((response) => response.json())
      .then((response) => {
        const monthly: any = {};
        const labels: any = [];
        const datasets: any =
          checkedItemsTransport.map((item: any) => {
            return {
              label: getLabelByValueTransport(item),
              data: [],
              borderWidth: 1,
            }
          })
        if (Array.isArray(response)) {
          response.forEach((row: any) => {
            const data = row.date.split(" ")[0]
            const month = data.split("/")[2] + "-" + data.split("/")[0]
            checkedItemsTransport.forEach((item: any) => {
              if (monthly[month] === undefined) {
                monthly[month] = {}
              }
              if (monthly[month][item] === undefined) {
                monthly[month][item] = 0
              }
              monthly[month][item] += row[item]
            })
          });
          Object.keys(monthly).forEach((key) => {
            labels.push(key)
          })
          checkedItemsTransport.forEach((item: any, index: number) => {
            Object.keys(monthly).forEach((key) => {
              datasets[index].data.push(monthly[key][item])
            })
            datasets[index].yAxisID = getTransportGroup(item)
            datasets[index].backgroundColor = getRandomColor()
          })
          setTransportData({
            labels: labels,
            datasets: datasets,
          })
          if (checkedItemsTransport.length > 0) {
            setIsTransportData(true);
          }
        } else {
          console.error("Unexpected response format:", response)
        }
      })

    authService.fetchWithAuth("http://localhost:3000/api/who/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user?.token}`,
      },
      body: JSON.stringify(infectedBody),
    })
      .then((response) => response.json())
      .then((response) => {
        const monthly: any = {};
        if (startDate === "2019") {
          checkedItemsInfected.forEach((item: any) => {
            monthly["2019-01"] = {}
            monthly["2019-02"] = {}
            monthly["2019-03"] = {}
            monthly["2019-04"] = {}
            monthly["2019-05"] = {}
            monthly["2019-06"] = {}
            monthly["2019-07"] = {}
            monthly["2019-08"] = {}
            monthly["2019-09"] = {}
            monthly["2019-10"] = {}
            monthly["2019-11"] = {}
            monthly["2019-12"] = {}
            monthly["2019-01"][item] = 0
            monthly["2019-02"][item] = 0
            monthly["2019-03"][item] = 0
            monthly["2019-04"][item] = 0
            monthly["2019-05"][item] = 0
            monthly["2019-06"][item] = 0
            monthly["2019-07"][item] = 0
            monthly["2019-08"][item] = 0
            monthly["2019-09"][item] = 0
            monthly["2019-10"][item] = 0
            monthly["2019-11"][item] = 0
            monthly["2019-12"][item] = 0
          })
        }
        const labels: any = [];
        const datasets: any =
          checkedItemsInfected.map((item: any) => {
            return {
              label: getLabelByValueInfected(item),
              data: [],
              borderWidth: 1,
            }
          })
        if (Array.isArray(response)) {
          response.forEach((row: any) => {
            const data = row.dateReported.split(" ")[0]
            const month = data.split("-")[0] + "-" + data.split("-")[1]
            checkedItemsInfected.forEach((item: any) => {
              if (monthly[month] === undefined) {
                monthly[month] = {}
              }
              if (monthly[month][item] === undefined) {
                monthly[month][item] = 0
              }
              monthly[month][item] += row[item]
            })
          });
          Object.keys(monthly).forEach((key) => {
            labels.push(key)
          })
          checkedItemsInfected.forEach((item: any, index: number) => {
            Object.keys(monthly).forEach((key) => {
              datasets[index].data.push(monthly[key][item])
            })
            datasets[index].yAxisID = getInfectedGroup(item)
            datasets[index].backgroundColor = getRandomColor()
          })

          setInfectedData({
            labels: labels,
            datasets: datasets,
          })
          if (checkedItemsInfected.length > 0) {
            setIsInfectedData(true);
          }
        } else {
          console.error("Unexpected response format:", response)
        }
      })
  }, [checkedItemsTransport, checkedItemsInfected, startDate, endDate]);

  useEffect(() => {
    if (isInfectedData && isTransportData) {
      const labels = [
        ...new Set([...infectedData.labels,
        ...transportData.labels])
      ]
      const datasets = [
        ...infectedData.datasets,
        ...transportData.datasets
      ]

      setData({
        labels: labels,
        datasets: datasets
      });
      setLoading(false);
    } else if (isInfectedData) {
      const labels = [
        ...infectedData.labels
      ]
      const datasets = [
        ...infectedData.datasets
      ]

      setData({
        labels: labels,
        datasets: datasets
      });
      setLoading(false);
    }
    else if (isTransportData) {
      const labels = [
        ...transportData.labels
      ]
      const datasets = [
        ...transportData.datasets
      ]
      setData({
        labels: labels,
        datasets: datasets
      });
      setLoading(false);
    } else {
      setLoading(true);
    }

  }, [isInfectedData, isTransportData, infectedData, transportData]);

  const handleCheckboxChangeTransport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItemsTransport((prev: any) => [...prev, value]);
    } else {
      setCheckedItemsTransport((prev: any) => prev.filter((item: any) => item !== value));
    }
  };

  const handleCheckboxChangeInfected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckedItemsInfected((prev: any) => [...prev, value]);
    } else {
      setCheckedItemsInfected((prev: any) => prev.filter((item: any) => item !== value));
    }
  };

  return (
    <div className="flex flex-grow px-20 mx-20 w-full">
      <div className="flex border-2 rounded-lg p-4 w-full">
        <div className="flex flex-row">
          <div className="flex flex-col flex-wrap">
            {
              transportChartDataOptions.map((item: any, index: number) => {
                return (<div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    name={item.name}
                    value={item.value}
                    className=""
                    onChange={handleCheckboxChangeTransport}
                  />
                  <label htmlFor={`checkbox-${index}`} className="text-gray-700">
                    {item.label}
                  </label>
                </div>)
              })
            }
            <DatePicker name="startDate" value={startDate} setValue={setStartDate} />
            <DatePicker name="endDate" value={endDate} setValue={setEndDate} />
          </div>
          <div className="flex flex-col">
            {
              infectedChartDataOptions.map((item: any, index: number) => {
                return (<div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`checkbox-${index}`}
                    name={item.name}
                    value={item.value}
                    className=""
                    onChange={handleCheckboxChangeInfected}
                  />
                  <label htmlFor={`checkbox-${index}`} className="text-gray-700">
                    {item.label}
                  </label>
                </div>)
              })
            }
          </div>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="flex flex-grow">
            <div className="w-full h-96">
              <Line
                data={data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  showLine: false,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin;