import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { CodeEditorService } from 'src/app/core/services/judge/code-editor-service/code-editor.service';
import { SourceCodeModel } from 'src/app/core/models/judge/source-code.model';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {

  mode: string;

  selected = 0;
  hovered = 0;
  readonly = false;

  editorOptions = {
    theme: 'vs',
    language: 'csharp',
    contextmenu: 'true',
    codelens: 'true',
    colorDecorators: 'true',
    formatOnType: 'true'
  };
  consoleOptions = {
  };

 code: string = 'function x() {\nconsole.log("Hello world!");\n}';
 public source: SourceCodeModel;

  id: number;
  task: any;
  private sub: any;

  algorithmTask: AlgorithmTaskListModel;
  algorithmTaskId: number;
  constructor(
    private route: ActivatedRoute,
    private algorithmTaskService: AlgorithmTaskService,
    private alertify: AlertifyService,
    private codeEditorService: CodeEditorService
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
  compileSourceCode() {
    // if (this.verificationDataAddForm.valid) {
    //   this.verificationDataAddObject = Object.assign({}, this.verificationDataAddForm.value);
      // this.source.sourceCode = 'dsadadsasad';
      //const str = this.code.replace('"', '/\/');
      this.source = {
        source_code: this.code,
        language_id: 16
      },
      console.log(this.source);
      this.codeEditorService.compileSourceCode(this.source).subscribe(
        result => {
          // this.ngOnInit();
          console.log(result);

          // this.alertifyService.success('Dane testowe zostały dodane');
        },
        error => {
          console.log(error);
          // this.alertifyService.error(error);
        }
      );
    }
    setDark() {
      this.editorOptions = {
        theme: 'vs-dark',
        language: 'csharp',
        contextmenu: 'true',
        codelens: 'true',
        colorDecorators: 'true',
        formatOnType: 'true'
      };
    }
    setLight() {
      this.editorOptions = {
        theme: 'vs',
        language: 'csharp',
        contextmenu: 'true',
        codelens: 'true',
        colorDecorators: 'true',
        formatOnType: 'true'
      };
    }
}

