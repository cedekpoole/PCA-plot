import { useEffect, useRef, useState } from "react";
import { parseCSVData } from "./helpers/CSVHandling";
import { FileInput, HTMLSelect } from "@blueprintjs/core";
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
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.disabled =
        selectedCheckboxes.length >= 3 &&
        !selectedCheckboxes.includes(checkbox.value);
    });
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
        <div className="pca-flex pca-flex-col pca-items-center pca-space-y-3 pca-pt-10">
          <div className="pca-grid sm:pca-grid-cols-2 pca-grid-cols-1 pca-gap-2 sm:pca-gap-6 pca-items-center">
            <label htmlFor="dataFile" className="sm:pca-text-right">
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
              className="input"
            />
          </div>
          <div className="pca-grid sm:pca-grid-cols-2 pca-grid-cols-1 pca-gap-2 sm:pca-gap-6 pca-items-center">
            <label htmlFor="experimentalFile" className="sm:pca-text-right">
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
              className="input"
            />
          </div>
        </div>
        <div className="pca-flex pca-flex-col pca-items-center">
        <div className="pca-grid sm:pca-grid-cols-2 pca-grid-cols-1 pca-gap-2 sm:pca-gap-6 pca-items-center pca-mt-6">
          <label htmlFor="colorBy" className="sm:pca-text-right">
            Colour by:
          </label>
          <HTMLSelect // Add this right before the PCAGraph component
            options={Object.keys(parsedSampleInfo[0] || {})
              .filter((key) => key !== "name")
              .slice(1)
              .map((key) => ({ label: key, value: key }))}
            value={colorBy}
            onChange={handleColorByChange}
            className="pca-w-[295px]"
          />
        </div>
        <div className="pca-grid sm:pca-grid-cols-2 pca-grid-cols-1 pca-gap-5 sm:pca-gap-6 pca-items-center pca-mt-8">
          <label htmlFor="filterPC" className="sm:pca-text-right">
            Filter Principal Components
          </label>
          <div className="pca-flex pca-gap-4">
            {["1", "2", "3", "4"].map((value) => (
              <div key={value} className="checkbox-button-group">
                <input
                  type="checkbox"
                  id={`pc${value}`}
                  value={value}
                  checked={selectedCheckboxes.includes(value)}
                  onChange={handleCheckboxChange}
                  className="pca-hidden" // Hide the checkbox
                />
                <label
                  htmlFor={`pc${value}`}
                  className={`checkbox-button-label ${
                    selectedCheckboxes.includes(value)
                      ? "pca-bg-primary-100 pca-border-2 pca-border-primary-80 hover:pca-bg-primary-80"
                      : "pca-bg-gray-300 pca-border-2 pca-border-gray-200 hover:pca-bg-gray-200"
                  } pca-text-white pca-py-2 pca-px-4 pca-rounded-lg pca-cursor-pointer pca-transition-colors`}
                >
                  {`PC${value}`}
                </label>
              </div>
            ))}
          </div>
        </div>
        </div>
        <hr className="pca-mt-10 pca-mb-4 pca-border-t pca-border-gray-300 pca-w-1/2 pca-mx-auto" />
      </form>
    </div>
  );
}

export default UserInput;
