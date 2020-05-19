export class MarkStatisticsModel {
    positiveMarksNumber: number;
    negativeMarksNumber: number;
}
export class VerdictStatisticsModel{
    acceptedNumber: number;
    notAcceptedNumber: number;
    compilationErrorNumber: number;
    runtimeErrorNumber: number;
    memoryLimitExceededNumber: number;
    timeLimitExceededNumber: number;
    linesOfCodeLimitExceededNumber: number;
}
export class AssetStatisticsModel{
    coursesNumber: number;
    examsNumber: number;
    flashcardsSetNumber: number;
    algorithmTasksNumber: number;
    lessonNumber: number;
}
export class UserStatisticsModel {
    administratorsNumber: number;
    teachersNumber: number;
    studentsNumber: number;
}