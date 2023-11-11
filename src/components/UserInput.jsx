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
  }, [selectedGeneCountName, selectedSampleInfoName]);

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
        <div className="flex flex-col items-center space-y-3 pt-10">
          <div className="grid grid-cols-2 gap-6 items-center">
            <label htmlFor="dataFile" className="text-right">
              Upload your data file
            </label>
            <FileInput
              text={selectedGeneCountName || "Upload data..."}
              inputProps={{
                id: "dataFile",
                accept: ".csv",
                ref: geneCountRef,
                required: true,
              }}
              onInputChange={(e) => handleFileChange(e, "geneCount")}
              data-testid="input1"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 items-center">
            <label htmlFor="experimentalFile" className="text-right">
              Upload your experimental condition file
            </label>
            <FileInput
              text={selectedSampleInfoName || "Experimental design table..."}
              inputProps={{
                id: "experimentalFile",
                accept: ".csv",
                ref: sampleInfoRef,
                required: true,
              }}
              onInputChange={(e) => handleFileChange(e, "sampleInfo")}
              data-testid="input2"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 items-center mt-6">
          <label htmlFor="colorBy" className="text-right">
            Colour by:
          </label>
          <HTMLSelect // Add this right before the PCAGraph component
            options={Object.keys(parsedSampleInfo[0] || {})
              .filter((key) => key !== "name")
              .slice(1)
              .map((key) => ({ label: key, value: key }))}
            value={colorBy}
            onChange={handleColorByChange}
            className="w-[295px]"
          />
        </div>
        <div className="grid grid-cols-2 gap-6 items-center mt-8">
          <label htmlFor="filterPC" className="text-right">
            Filter Principal Components
          </label>
          <div className="flex gap-4">
            {["1", "2", "3", "4"].map((value) => (
              <div key={value} className="checkbox-button-group">
                <input
                  type="checkbox"
                  id={`pc${value}`}
                  value={value}
                  checked={selectedCheckboxes.includes(value)}
                  onChange={handleCheckboxChange}
                  className="hidden" // Hide the checkbox
                />
                <label
                  htmlFor={`pc${value}`}
                  className={`checkbox-button-label ${
                    selectedCheckboxes.includes(value)
                      ? "bg-primary-100 border-2 border-primary-80 hover:bg-primary-80"
                      : "bg-gray-300 border-2 border-gray-200 hover:bg-gray-200"
                  } text-white border-primary-100font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors`}
                >
                  {`PC${value}`}
                </label>
              </div>
            ))}
          </div>
        </div>
        <hr className="mt-10 mb-4 border-t border-gray-300 w-1/2 mx-auto" />
      </form>
    </div>
  );
}

export default UserInput;
