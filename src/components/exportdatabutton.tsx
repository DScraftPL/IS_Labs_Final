const ExportDataButton = (props: {
  data: any
  type: string
}) => {
  const handleExport = () => {
    console.log("Exporting data...");

    let fileContent = ""
    let mimeType = ""

    if (props.type === "xml") {
      const convertToXML = (obj: any, rootElement = "root"): string => {
        let xml = `<${rootElement}>`;
        for (const key in obj) {
          const tagName = isNaN(Number(key)) ? key : `item_${key}`;
          if (typeof obj[key] === "object") {
        xml += convertToXML(obj[key], tagName);
          } else {
        xml += `<${tagName}>${obj[key]}</${tagName}>`;
          }
        }
        xml += `</${rootElement}>`;
        return xml;
      };

      fileContent = convertToXML(props.data);
      mimeType = "application/xml";
    } else {
      // Default to JSON export
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