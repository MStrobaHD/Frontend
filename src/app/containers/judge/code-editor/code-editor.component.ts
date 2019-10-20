import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlgorithmTaskService } from "src/app/core/services/judge/algorithm-task-service/algorithm-task.service";
import { AlgorithmTaskListModel } from "src/app/core/models/judge/algorithm-task.model";
import { AlertifyService } from "src/app/core/services/shared/alertify/alertify.service";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.scss"]
})
export class CodeEditorComponent implements OnInit {
  mode: string;

  selected = 0;
  hovered = 0;
  readonly = false;
  
  editorOptions = {
    theme: this.mode,
    language: 'csharp',
    contextmenu: 'true',
    codelens: 'true',
    colorDecorators: 'true',
    formatOnType: 'true'
  };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  id: number;
  task: any;
  private sub: any;

  algorithmTask: AlgorithmTaskListModel;
  algorithmTaskId: number;
  constructor(
    private route: ActivatedRoute,
    private algorithmTaskService: AlgorithmTaskService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.algorithmTaskId = +this.route.snapshot.paramMap.get('id');
    this.getAlgorithmTask();
  }
  getAlgorithmTask() {
    this.algorithmTaskService
      .getAlgorithmTaskForSolveAsync(this.algorithmTaskId)
      .subscribe(result => {
        this.algorithmTask = result;
        this.alertify.success('Data loaded correctly');
      });
  }
}
