import { PCA } from 'ml-pca';

export const runPCA = (geneData, setPcaData) => {
    if (geneData.length > 0) {
        const matrix = geneData.map(row => Object.values(row).slice(1));
        const pca = new PCA(matrix);
        const pc1 = pca.getExplainedVariance()[0];
        const pc2 = pca.getExplainedVariance()[1];
        const pc3 = pca.getExplainedVariance()[2];
        const pc4 = pca.getExplainedVariance()[3];

        setPcaData({
            pc1: pc1,
            pc2: pc2,
            pc3: pc3,
            pc4: pc4
        });
      }
}