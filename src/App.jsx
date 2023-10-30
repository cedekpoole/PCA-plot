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
  const [topGenes, setTopGenes] = useState([]);
  const [selectedPCIndex, setSelectedPCIndex] = useState(null);
  const [topGenesList, setTopGenesList] = useState([]);

  const handleSelectPC = (index) => {
    if (topGenes[index]) {
      setTopGenesList(topGenes[index]);
      setSelectedPCIndex(index + 1);
    }
  };
  return (
    <>
      <UserInput
        setShowChart={setShowChart}
        setPcaData={setPcaData}
        setScoresData={setScoresData}
        setParsedSampleInfo={setParsedSampleInfo}
        setSelectedCheckboxes={setSelectedCheckboxes}
        selectedCheckboxes={selectedCheckboxes}
        setTopGenes={setTopGenes}
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
              <div className="flex justify-center">
                <div className="w-2/3">
                  <ScreePlot pcaData={pcaData} onSelectPC={handleSelectPC} />
                </div>
                <div className="w-1/3 pl-4 pt-4">
                  {selectedPCIndex && (
                    <div>
                      <h2 className="text-center text-lg font-bold">
                        Top Genes (PC{selectedPCIndex}):
                      </h2>
                      <ul>
                        {topGenesList.map((gene, index) => (
                          <li key={index}>
                            {index + 1}. {gene.gene}: {gene.loading.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
