import { useEffect, useRef, useState } from "react";
import { parseCSVData } from "./helpers/CSVHandling";
import "@blueprintjs/core/lib/css/blueprint.css";
import { FileInput, Checkbox, Button } from "@blueprintjs/core";

function UserInput() {
  const geneCountRef = useRef(null);
  const sampleInfoRef = useRef(null);

  const [showChart, setShowChart] = useState(false);
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [parsedSampleInfo, setParsedSampleInfo] = useState([]);
  const [selectedGeneCountName, setSelectedGeneCountName] = useState("");
  const [selectedSampleInfoName, setSelectedSampleInfoName] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(["1", "2"]);

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
        <p className="text-center my-4">Please select 2 components:</p>
        <div className="flex gap-4 justify-center">
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
        <div className="flex justify-center mt-4">
          <Button type="submit" disabled={selectedCheckboxes.length !== 2}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserInput;
