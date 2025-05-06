import { useState, useEffect } from 'react';

import useInfectedData from './useInfectedData';
import useTransportData from './useTransportData';

const useMultipleData = (props: {
  startDate: string
  endDate: string
  typeTransport: string
  typeInfected: string
}) => {
  const [combinedData, setCombinedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const infectedData = useInfectedData({
    startDate: props.startDate,
    endDate: props.endDate,
    type: props.typeInfected,
  })
  const transportData = useTransportData({
    startDate: props.startDate,
    endDate: props.endDate,
    type: props.typeTransport,
  })

  useEffect(() => {
    if (infectedData.loading || transportData.loading) {
      setLoading(true);
      return
    } else {
      console.log("recompute")
      const labels = [
        ...new Set([...infectedData.data.labels,
        ...transportData.data.labels])
      ]
      const datasets = [
        ...infectedData.data.datasets,
        ...transportData.data.datasets
      ]

      datasets[0].type = "bar"
      datasets[0].yAxisID = "y"
      datasets[1].type = "bar"
      datasets[1].yAxisID = "y1"

      setCombinedData({
        labels: labels,
        datasets: datasets
      });

      setLoading(false);
    }
  }, [
    infectedData.loading,
    transportData.loading,
    infectedData.data?.labels,
    transportData.data?.labels,
    infectedData.data?.datasets,
    transportData.data?.datasets
  ]);

  return { data: combinedData, loading };
}

export default useMultipleData;