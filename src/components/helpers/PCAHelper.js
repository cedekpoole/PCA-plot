import { PCA } from "ml-pca";

export const runPCA = (geneData, setPcaData, setScoresData) => {
  const transpose = (arr) => {
    return arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
  };

  if (geneData.length > 0) {
    const matrix = geneData.map((row) => Object.values(row).slice(1));
    const transposedMatrix = transpose(matrix);
    const pca = new PCA(transposedMatrix);
    const scores = pca.predict(transposedMatrix).data;

    const explainedVariances = pca.getExplainedVariance();
    const pc1 = explainedVariances[0];
    const pc2 = explainedVariances[1];
    const pc3 = explainedVariances[2];
    const pc4 = explainedVariances[3];

    setPcaData({
      pc1,
      pc2,
      pc3,
      pc4,
    });
    setScoresData(scores);
  }
};
