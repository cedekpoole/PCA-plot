import { useEffect, useRef, useState } from "react";
import { parseCSVData } from "./helpers/CSVHandling";
import { FileInput, Checkbox, HTMLSelect } from "@blueprintjs/core";
import { runPCA } from "./helpers/PCAHelper";

function UserInput({
  setShowChart,
  setPcaData,
  setScoresData,
  parsedSampleInfo,
  setParsedSampleInfo,
  setSelectedCheckboxes,
  selectedCheckboxes,
  setTopGenes,
  colorBy,
  setColorBy,
}) {
  const geneCountRef = useRef(null);
  const sampleInfoRef = useRef(null);

  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [selectedGeneCountName, setSelectedGeneCountName] = useState("");
  const [selectedSampleInfoName, setSelectedSampleInfoName] = useState("");

  useEffect(() => {
    // Logic to handle disabling/enabling checkboxes
    if (selectedCheckboxes.length >= 2) {
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          if (!selectedCheckboxes.includes(checkbox.value)) {
            checkbox.disabled = true;
          }
        });
    } else {
      document
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.disabled = false;
        });
    }
  }, [selectedCheckboxes]);

  useEffect(() => {
    if (selectedGeneCountName && selectedSampleInfoName) {
      handleSubmit();
    }
  }, [selectedGeneCountName, selectedSampleInfoName])

  const handleFileChange = (e, identifier) => {
    setShowChart(false);

    if (identifier === "geneCount") {
      setSelectedGeneCountName("");
    } else if (identifier === "sampleInfo") {
      setSelectedSampleInfoName("");
    }

    const file = e.target.files[0];
    if (file) {
      if (identifier === "geneCount") {
        setSelectedGeneCountName(file.name);
        parseCSVData(geneCountRef, setParsedCsvData);
      } else if (identifier === "sampleInfo") {
        setSelectedSampleInfoName(file.name);
        parseCSVData(sampleInfoRef, setParsedSampleInfo);
      }
    }
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((cb) => cb !== value));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, value]);
    }
  };

  const handleSubmit = () => {
    runPCA(parsedCsvData, setPcaData, setScoresData, setTopGenes);
    setShowChart(true);
  };

  const handleColorByChange = (event) => {
    setColorBy(event.target.value);
  };

  return (
    <div data-testid="user-input">
      <form>
        <div className="flex justify-center space-x-4 pt-10 flex-wrap">
          <FileInput
            text={selectedGeneCountName || "Upload data..."}
            inputProps={{
              accept: ".csv",
              ref: geneCountRef,
              required: true,
            }}
            onInputChange={(e) => handleFileChange(e, "geneCount")}
            data-testid="input1"
          />
          <FileInput
            text={selectedSampleInfoName || "Experimental design table..."}
            inputProps={{
              accept: ".csv",
              ref: sampleInfoRef,
              required: true,
            }}
            onInputChange={(e) => handleFileChange(e, "sampleInfo")}
            data-testid="input2"
          />
        </div>
        <div className="flex justify-center items-center mt-6">
        <label className="inline mr-3">Colour By:</label>
            <HTMLSelect // Add this right before the PCAGraph component
            options={Object.keys(parsedSampleInfo[0] || {}).filter(
              (key) => key !== "name"
            ).slice(1).map((key) => ({ label: key, value: key }))}
            value={colorBy}
            onChange={handleColorByChange}
          />
          </div>
        <div className="flex gap-4 justify-center mt-6">
          <Checkbox
            label="PC1"
            value="1"
            checked={selectedCheckboxes.includes("1")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            label="PC2"
            value="2"
            checked={selectedCheckboxes.includes("2")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            label="PC3"
            value="3"
            checked={selectedCheckboxes.includes("3")}
            onChange={handleCheckboxChange}
          />
          <Checkbox
            label="PC4"
            value="4"
            checked={selectedCheckboxes.includes("4")}
            onChange={handleCheckboxChange}
          />
        </div>
      </form>
    </div>
  );
}

export default UserInput;
