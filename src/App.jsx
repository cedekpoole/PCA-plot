import UserInput from "./components/UserInput";
import PCAGraph from "./components/PCAGraph";
import { useState } from "react";

function App() {
  const [showChart, setShowChart] = useState(false);
  const [pcaData, setPcaData] = useState([]);
  const [scoresData, setScoresData] = useState([]);
  const [parsedSampleInfo, setParsedSampleInfo] = useState([]);
  return (
    <>
      <UserInput
        setShowChart={setShowChart}
        setPcaData={setPcaData}
        setScoresData={setScoresData}
        setParsedSampleInfo={setParsedSampleInfo}
      />
      {showChart && (
        <PCAGraph
          pcaData={pcaData}
          scoresData={scoresData}
          parsedSampleInfo={parsedSampleInfo}
        />
      )}
    </>
  );
}

export default App;
