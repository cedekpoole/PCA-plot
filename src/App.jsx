import UserInput from "./components/UserInput";
import PCAGraph from "./components/PCAGraph";
import ScreePlot from "./components/ScreePlot";
import GeneTable from "./components/GeneTable";
import { downloadCSV } from "./components/helpers/CSVHandling";
import { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";

function App() {
  const [showChart, setShowChart] = useState(false);
  const [pcaData, setPcaData] = useState([]);
  const [scoresData, setScoresData] = useState([]);
  const [parsedSampleInfo, setParsedSampleInfo] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(["1", "2"]);
  const [topGenes, setTopGenes] = useState([]);
  const [selectedPCIndex, setSelectedPCIndex] = useState(null);
  const [topGenesList, setTopGenesList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const handleSelectPC = (index) => {
    if (topGenes[index]) {
      setTopGenesList(topGenes[index]);
      setSelectedPCIndex(index + 1);
      setShowModal(true);
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
          <div className="mt-6 flex flex-col lg:flex-row w-5/6">
            <div className="lg:w-2/5 w-full lg:mr-4">
              {selectedCheckboxes.length === 2 && (
                <PCAGraph
                  pcaData={pcaData}
                  scoresData={scoresData}
                  parsedSampleInfo={parsedSampleInfo}
                  selectedPCs={selectedCheckboxes}
                />
              )}
            </div>
            <div className="lg:w-3/5 w-full lg:mt-0 mt-4">
              <div className="flex justify-center">
                <div className="w-2/3">
                  <ScreePlot pcaData={pcaData} onSelectPC={handleSelectPC} />
                </div>
                <div className="w-1/3 pl-4 pt-4">
                  {selectedPCIndex && (
                    <Dialog
                      isOpen={showModal}
                      onClose={closeModal}
                      title={`Top Genes (PC${selectedPCIndex}):`}
                    >
                      <DialogBody>
                        <GeneTable topGenes={topGenesList} />
                      </DialogBody>
                      <DialogFooter actions={<Button onClick={() => downloadCSV(topGenesList, selectedPCIndex)}>Download</Button>}/>
                    </Dialog>
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
