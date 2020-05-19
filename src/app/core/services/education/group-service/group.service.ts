import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GroupModel, GroupAddModel, StudentToGroupAssigmentModel, CourseToGroupAssigmentModel, TaskToGroupAssigmentModel, STGAssigment, CTGAssigment, TTGAssigment, ResultSheet, SolutionModel } from 'src/app/core/models/education/group/group.model';
import { CourseModel } from 'src/app/core/models/education/course/course.model';
import { EnlistParameter } from 'src/app/core/models/education/course/enlist-paramater.model';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { VerdictModel } from 'src/app/core/models/judge/verdict.model';
import { VerdictListModel } from 'src/app/core/models/judge/verdict/verdict.list.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGroup(groupId: number) {
    return this.http.get<GroupModel[]>(this.baseUrl + 'group/' + groupId);
  }
  getMyGroup(userId: number) {
    return this.http.get<GroupModel[]>(this.baseUrl + 'group/teachergroups/' + userId);
  }
  getResultOfGroup(groupId: number) {
    return this.http.get<ResultSheet[]>(this.baseUrl + 'group/groupStudentsResults/' + groupId);
  }
  getGroups() {
    return this.http.get<GroupModel[]>(this.baseUrl + 'group/');
  }
  getCopiesOfVerdict(verdictId: number) {
    return this.http.get<VerdictListModel[]>(this.baseUrl + 'judge/copies/' + verdictId);
  }
  getVerdict(verdictId: number) {
    return this.http.get<VerdictListModel>(this.baseUrl + 'verdict/actual/' + verdictId);
  }
  getCoursesAssignedToGroup(groupId: number) {
    return this.http.get<CourseModel[]>(this.baseUrl + 'group/coursestogroup/' + groupId);
  }
  getCoursesAssignedToUser(userId: number) {
    return this.http.get<CourseModel[]>(this.baseUrl + 'group/coursestouser/' + userId);
  }
  getTasksAssignedToGroup(groupId: number) {
    return this.http.get<CourseModel[]>(this.baseUrl + 'group/taskstogroup/' + groupId);
  }
  getTasksAssignedToUser(userId: number) {
    return this.http.get<AlgorithmTaskListModel[]>(this.baseUrl + 'group/taskstouser/' + userId);
  }
  getVerdictOfGroupByTask(groupId: number, taskId: number) {
    const url =
      this.baseUrl + `group/groupVerdictByTask?groupId=${groupId}&taskId=${taskId}`;
    return this.http.get<SolutionModel[]>(url);
  }
  updateVerdict(verdictId: number, verdictName: string) {
    const url =
      this.baseUrl + `verdict/update?verdictId=${verdictId}&verdictName=${verdictName}`;
    return this.http.get(url);
  }
  addGroup(group: GroupAddModel) {
    return this.http.post<GroupAddModel[]>(this.baseUrl + 'group/', group);
  }
  AssignStudentsToGroup(assignment: StudentToGroupAssigmentModel) {
    return this.http.post<StudentToGroupAssigmentModel[]>(this.baseUrl + 'group/STGAssignment', assignment);
  }
  AssignManyStudentsToManyGroup(assignment: STGAssigment) {
    return this.http.post<StudentToGroupAssigmentModel[]>(this.baseUrl + 'group/STGAssignmentList', assignment);
  }
  AssignCoursesToGroup(assignment: CourseToGroupAssigmentModel) {
    return this.http.post<CourseToGroupAssigmentModel[]>(this.baseUrl + 'group/CTGAssignment', assignment);
  }
  AssignManyCoursesToManyGroup(assignment: CTGAssigment) {
    return this.http.post<CourseToGroupAssigmentModel[]>(this.baseUrl + 'group/CTGAssignmentList', assignment);
  }
  AssignTasksToGroup(assignment: TaskToGroupAssigmentModel) {
    return this.http.post<TaskToGroupAssigmentModel[]>(this.baseUrl + 'group/TTGAssignment', assignment);
  }
  AssignManyTasksToManyGroup(assignment: TTGAssigment) {
    return this.http.post<TaskToGroupAssigmentModel[]>(this.baseUrl + 'group/TTGAssignmentList', assignment);
  }
  DeleteSTGAssignment(userId: number, groupId: number) {
    const url =
      this.baseUrl + `group/STGResignation?userId=${userId}&groupId=${groupId}`;
    return this.http.delete(url);
  }
  DeleteCTGAssignment(courseId: number, groupId: number) {
    const url =
      this.baseUrl + `group/CTGResignation?userId=${courseId}&courseId=${groupId}`;
    return this.http.delete(url);
  }
  DeleteTTGAssignment(taskId: number, groupId: number) {
    const url =
      this.baseUrl + `group/TTGResignation?userId=${taskId}&courseId=${groupId}`;
    return this.http.delete(url);
  }
}
