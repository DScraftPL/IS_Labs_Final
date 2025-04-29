import convert from "xml-js";

const ExportDataButton = (props: {
  data: any
  type: string
}) => {
  const handleExport = () => {
    let fileContent = ""
    let mimeType = ""

    console.log("Exporting data:", props.data);

    if (props.type === "xml") {
      const structuredData = {
        labels: props.data.labels.map((label: string) => ({ label })),
        datasets: props.data.datasets.map((dataset: any) => ({
          dataset: {
            label: dataset.label,
            data: dataset.data.map((value: number) => ({ data: value })),
            borderWidth: dataset.borderWidth,
          },
        })),
      };
    
      fileContent =
        '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n' +
        convert.js2xml(structuredData, { compact: true, ignoreComment: true, spaces: 4 }) + '</root>';
      mimeType = "application/xml";
    } else {
      fileContent = JSON.stringify(props.data, null, 2);
      mimeType = "application/json";
    }

    const blob = new Blob([fileContent], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `data.${props.type}`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleExport} className="border-2 border-gray-300 bg-blue-500 text-white py-2 px-4 rounded">
      Export Data as {props.type}
    </button>
  );
}

export default ExportDataButton;