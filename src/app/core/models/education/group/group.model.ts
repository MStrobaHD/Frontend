export class GroupModel {
  id: number;
  groupName: string;
  groupType: string;
  teacherId: string;
}
export class GroupAddModel {
  groupName: string;
  groupType: string;
  teacherId: string;
}
export class CourseToGroupAssigmentModel {
    courseId: number;
    groupId: number;
}
export class TaskToGroupAssigmentModel {
    algorithmTaskId: number;
    groupId: number;
}
export class StudentToGroupAssigmentModel {
    groupId: number;
    userId: number;
}
export class STGAssigment {
  groupIds: number[];
  studentIds: number[];
}
export class CTGAssigment {
  courseIds: number[];
  groupIds: number[];
}
export class TTGAssigment {
  algorithmTaskIds: number[];
  groupIds: number[];
}
export class ResultSheet {
  id: number;
  username: string;
  email: string;
  examResultList: ExamResult[]; 
  verdictList: Verdict[]; 
}
export class ExamResult {
  mark: string;
  points: number;
  maxPoints: number;
  examName: string;
}
export class Verdict {
  verdictName: string;
  time: number;
  memory: number;
  examName: string;
}
export class SolutionModel {
  verdictName: string;
  studentName: string;
  isCopied: number;
  algorithmTaskId: number;
}