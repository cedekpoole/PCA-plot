import { useEffect, useRef, useState } from "react";
import { parseCSVData } from "./helpers/CSVHandling";
import "@blueprintjs/core/lib/css/blueprint.css";
import { FileInput } from "@blueprintjs/core";


function UserInput() {
    const geneCountRef = useRef(null);
    const sampleInfoRef = useRef(null);

    const [showChart, setShowChart] = useState(false);
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const [parsedSampleInfo, setParsedSampleInfo] = useState([]);
    const [selectedGeneCountName, setSelectedGeneCountName] = useState("");
    const [selectedSampleInfoName, setSelectedSampleInfoName] = useState("");

    const handleFileChange = (e, identifier) => {
        setShowChart(false);
        
        if(identifier === 'geneCount') {
            setSelectedGeneCountName("");
        } else if(identifier === 'sampleInfo') {
            setSelectedSampleInfoName("");
        }
    
        const file = e.target.files[0];
        if (file) {
          if(identifier === 'geneCount') {
            setSelectedGeneCountName(file.name);
            parseCSVData(geneCountRef, setParsedCsvData)
          } else if(identifier === 'sampleInfo') {
            setSelectedSampleInfoName(file.name);
            parseCSVData(sampleInfoRef, setParsedSampleInfo)
          }
        }
    };

  return (
    <div data-testid="user-input">
      <form>
        <div className="flex justify-center space-x-4 pt-20 ">
        <FileInput
            text={selectedGeneCountName || "Upload data..."}
            inputProps={{
              accept: ".csv",
              ref: geneCountRef,
              required: true,
            }}
            onInputChange={(e) => handleFileChange(e, 'geneCount')}
            data-testid="input1"
          />
          <FileInput
            text={selectedSampleInfoName || "Upload sample info..."}
            inputProps={{
              accept: ".csv",
              ref: sampleInfoRef,
              required: true,
            }}
            onInputChange={(e) => handleFileChange(e, 'sampleInfo')}
            data-testid="input2"
          />
        </div>
      </form>
    </div>
  );
}

export default UserInput;
