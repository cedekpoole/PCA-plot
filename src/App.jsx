import UserInput from "./components/UserInput";
import PCAGraph from "./components/PCAGraph";
import ScreePlot from "./components/ScreePlot";
import { useState } from "react";

function App() {
  const [showChart, setShowChart] = useState(false);
  const [pcaData, setPcaData] = useState([]);
  const [scoresData, setScoresData] = useState([]);
  const [parsedSampleInfo, setParsedSampleInfo] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(["1", "2"]);
  return (
    <>
      <UserInput
        setShowChart={setShowChart}
        setPcaData={setPcaData}
        setScoresData={setScoresData}
        setParsedSampleInfo={setParsedSampleInfo}
        setSelectedCheckboxes={setSelectedCheckboxes}
        selectedCheckboxes={selectedCheckboxes}
      />
      {showChart && (
        <div className="flex justify-center">
          <div className="mt-6 flex flex-col lg:flex-row w-4/5">
            <div className="lg:w-1/2 w-full lg:mr-4">
              {selectedCheckboxes.length === 2 && (
                <PCAGraph
                pcaData={pcaData}
                scoresData={scoresData}
                parsedSampleInfo={parsedSampleInfo}
                selectedPCs={selectedCheckboxes}
              />
              )}
            </div>
            <div className="lg:w-1/2 w-full lg:mt-0 mt-4">
              <div className="w-2/3">
                <ScreePlot pcaData={pcaData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
