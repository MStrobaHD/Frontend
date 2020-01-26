export interface AlgorithmTaskAddModel {
    algorithmTaskName: string;
    description: string;
    userId: number;
    complexityId: number;
    algorithmCategoryId: number;
    verificationDataId: number;
    levelId: number;
    timeLimit: number;
    memoryLimit: number;
    elementaryOperationLimit: number;
    linesOfCodeLimit: number;
    timeToSolve: number;
    complexityOrder: number;
}