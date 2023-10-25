import UserInput from "./components/UserInput";
import PCAGraph from "./components/PCAGraph";
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
        <PCAGraph
          pcaData={pcaData}
          scoresData={scoresData}
          parsedSampleInfo={parsedSampleInfo}
          selectedPCs={selectedCheckboxes}
        />
      )}
    </>
  );
}

export default App;
