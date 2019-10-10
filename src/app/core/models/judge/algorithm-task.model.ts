import { UserModel } from './user.model';
import { ComplexityModel } from './complexity.model';
import { VerificationDataModel } from './verification-data.model';
import { LevelModel } from './level.model';
import { AlgorithmCategoryModel } from './algorithm-category.model';

export interface AlgorithmTaskListModel {
    id: number;
    algorithmTaskName: string;
    description: string;
    user: UserModel;
    complexity: ComplexityModel;
    algorithmCategory: AlgorithmCategoryModel;
    verificationData: VerificationDataModel;
    level: LevelModel;
}
