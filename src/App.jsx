import UserInput from "./components/UserInput";
import PCAGraph from "./components/PCAGraph";
import ScreePlot from "./components/ScreePlot";
import GeneTable from "./components/GeneTable";
import { downloadCSV } from "./components/helpers/CSVHandling";
import { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, HTMLSelect } from "@blueprintjs/core";

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

  const handleColorByChange = (event) => {
    setColorBy(event.target.value);
  };

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
          <div className="mt-6 flex flex-col lg:flex-row w-5/6 lg:-ml-10">
            <div className="lg:w-2/3 w-full lg:mr-4">
            <HTMLSelect // Add this right before the PCAGraph component
            options={Object.keys(parsedSampleInfo[0] || {}).filter(
              (key) => key !== "name"
            ).slice(1).map((key) => ({ label: key, value: key }))}
            value={colorBy}
            onChange={handleColorByChange}
            fill={true}
            className="mb-3"
          />
              {selectedCheckboxes.length === 2 && (
                <PCAGraph
                  pcaData={pcaData}
                  scoresData={scoresData}
                  parsedSampleInfo={parsedSampleInfo}
                  selectedPCs={selectedCheckboxes}
                  colorBy={colorBy}
                />
              )}
            </div>
            <div className="lg:w-1/3 w-full lg:mt-0 mt-4 lg:self-center lg:mb-11">
              <div className="flex justify-center">
                <div className="w-96">
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
                        <div className="max-h-[70%] overflow-y-auto">
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
                          >
                            Download
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
