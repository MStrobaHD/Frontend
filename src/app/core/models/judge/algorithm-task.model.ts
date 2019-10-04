import { UserModel } from './user.model';

export interface AlgorithmTaskListModel {
    id: number;
    algorithmTaskName: string;
    user: UserModel;
    complexity: string;
    algorithmCategory: string;
    level: string;
}
