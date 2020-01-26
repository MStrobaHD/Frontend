import { UserModel } from './user.model';
import { ComplexityModel } from './complexity.model';
import { VerificationDataModel } from './verification-data.model';
import { LevelModel } from './level.model';
import { AlgorithmCategoryModel } from './algorithm-category.model';

export interface AlgorithmTaskListModel {
    id: number;
    algorithmTaskName: string;
    description: string;
    timeLimit: number;
    memoryLimit: number;
    elementaryOperationLimit: number;
    linesOfCodeLimit: number;
    timeToSolveLimit: number;
    complexityOrder: number;
    ratePoints: number;
    user: UserModel;
    complexity: ComplexityModel;
    algorithmCategory: AlgorithmCategoryModel;
    verificationData: VerificationDataModel;
    level: LevelModel;
}
