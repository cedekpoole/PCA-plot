import './index.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
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
  const [colorBy, setColorBy] = useState("condition");

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
        parsedSampleInfo={parsedSampleInfo}
        setParsedSampleInfo={setParsedSampleInfo}
        setSelectedCheckboxes={setSelectedCheckboxes}
        selectedCheckboxes={selectedCheckboxes}
        setTopGenes={setTopGenes}
        colorBy={colorBy}
        setColorBy={setColorBy}
      />
      {showChart && (
        <div className="pca-flex pca-justify-center pca-mb-10">
          <div className="pca-mt-6 pca-flex pca-flex-col lg:pca-flex-row pca-w-5/6 lg:pca--ml-10">
            <div className="lg:pca-w-2/3 pca-w-full lg:pca-mr-4">
              {selectedCheckboxes.length >= 2 && selectedCheckboxes.length <= 3 && (
                <PCAGraph
                  pcaData={pcaData}
                  scoresData={scoresData}
                  parsedSampleInfo={parsedSampleInfo}
                  selectedPCs={selectedCheckboxes}
                  colorBy={colorBy}
                />
              )}
            </div>
            <div className="lg:pca-w-1/3 pca-w-full lg:pca-mt-0 pca-mt-4 lg:pca-self-center lg:pca-mb-11">
              <div className="pca-flex pca-justify-center">
                <div className="pca-w-96">
                  <ScreePlot pcaData={pcaData} onSelectPC={handleSelectPC} />
                </div>
                  {selectedPCIndex && (
                    <Dialog
                      isOpen={showModal}
                      onClose={closeModal}
                      title={`Top Genes (PC${selectedPCIndex}: ${(
                        Object.values(pcaData)[selectedPCIndex - 1] * 100
                      ).toFixed(2)}%):`}
                    >
                      <DialogBody>
                        <div className="pca-max-h-[70%] pca-overflow-y-auto">
                          <GeneTable topGenes={topGenesList} />
                        </div>
                      </DialogBody>
                      <DialogFooter
                        actions={
                          <Button
                            onClick={() =>
                              downloadCSV(topGenesList, selectedPCIndex, (Object.values(pcaData)[selectedPCIndex - 1] * 100
                              ).toFixed(2))
                            }
                            icon="download"
                          >
                            
                          </Button>
                        }
                      />
                    </Dialog>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
