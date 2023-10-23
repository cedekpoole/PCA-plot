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

    const pc1 = pca.getExplainedVariance()[0];
    const pc2 = pca.getExplainedVariance()[1];
    const pc3 = pca.getExplainedVariance()[2];
    const pc4 = pca.getExplainedVariance()[3];

    setPcaData({
      pc1,
      pc2,
      pc3,
      pc4,
    });
    setScoresData(scores);
  }
};
