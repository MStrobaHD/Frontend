import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlgorithmTaskService } from 'src/app/core/services/judge/algorithm-task-service/algorithm-task.service';
import { AlgorithmTaskListModel } from 'src/app/core/models/judge/algorithm-task.model';
import { AlertifyService } from 'src/app/core/services/shared/alertify/alertify.service';
import { CodeEditorService } from 'src/app/core/services/judge/code-editor-service/code-editor.service';
import { SourceCodeModel } from 'src/app/core/models/judge/source-code.model';
import { VerdictModel } from 'src/app/core/models/judge/verdict.model';
import { SourceCFGModel } from 'src/app/core/models/judge/source.model';
import { MatDialog } from '@angular/material';
import { MetricsDialog } from './metrics-dialog/metrics-dialog';
import { Observable } from 'rxjs';
import { MetricsModel } from 'src/app/core/models/judge/metrics.model';
import { SourceCodeInputModel } from 'src/app/core/models/judge/source-code-input.model';
import * as shape from 'd3-shape';
import { DiagramDialog } from './diagram-dialog.ts/diagram-dialog';
import { CFG } from 'src/app/core/models/judge/control-flow-graph.model';
import { DiagramModel } from 'src/app/core/models/judge/diagram.model';

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

  curve = shape.curveLinear;

  editorOptions = {
    theme: 'vs',
    language: 'csharp',
    contextmenu: 'true',
    codelens: 'true',
    colorDecorators: 'true',
    formatOnType: 'true'
  };
  consoleOptions = {};

  public code;
  input = '';
  resultInformation: any;
  public source: SourceCodeModel;
  public sourceCFG: SourceCFGModel;
  public sourceWithInput: SourceCodeInputModel;

  id: number;
  task: any;
  private sub: any;

  codeFromFile: ArrayBuffer;
  analyzedSourceCode: string;
  algorithmTask: AlgorithmTaskListModel;
  algorithmTaskId: number;
  verdict: VerdictModel;
  metrics: MetricsModel;
  controlFlowGraph: CFG;
  verdictName: string;

  constructor(
    private route: ActivatedRoute,
    private algorithmTaskService: AlgorithmTaskService,
    private alertify: AlertifyService,
    private codeEditorService: CodeEditorService,
    public dialog: MatDialog
  ) {
    this.code;
    // this.route.data.subscribe(data => this.algorithmTask = data;);
  }

  ngOnInit() {
    this.algorithmTask = this.route.snapshot.data.algorithmTask;

    this.route.params.subscribe(params => {
      console.log(+params.id);
      this.algorithmTaskId = +params.id;
    });
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

    if (this.input === '') {
      (this.source = {
        source_code: this.code,
        language_id: 51
      }),
      console.log(this.source);
      this.codeEditorService.compileSourceCode(this.source).subscribe(
        result => {
          this.resultInformation = result;
          this.ngOnInit();
          console.log(result);
          this.alertify.success('Kod żródłowy został skompilowany');
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
    } else if (this.input !== '') {
      (this.sourceWithInput = {
        source_code: this.code,
        language_id: 51,
        stdin: this.input,
        userId: +localStorage.getItem('userID'),
        algorithmTaskId: this.algorithmTaskId
      }),
      console.log(this.sourceWithInput);
      this.codeEditorService.compileSourceCodeWithInput(this.sourceWithInput).subscribe(
        result => {
          this.resultInformation = result;
          this.ngOnInit();
          console.log(result);
          this.alertify.success('Kod żródłowy z danymi wejściowymi został skompilowany');
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
    }
  }
  getMetrics() {
    (this.sourceCFG = {
      source_code: this.code
    }),
      this.codeEditorService.getMetrics(this.sourceCFG).subscribe(
        result => {
          this.metrics = result;
          this.ngOnInit();
          console.log(result);
          this.alertify.success('Metryki zostały obliczone');
          this.openDialog(this.metrics);
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
  }
  analyzeSourceCode() {
    //this.openDiagramDialog();
    (this.sourceCFG = {
      source_code: this.code
    }),
      this.codeEditorService.analyze(this.sourceCFG).subscribe(
        (data: CFG) => {
          this.controlFlowGraph = data;
          this.ngOnInit();
          console.log(data);
          this.openDiagramDialog(this.controlFlowGraph);
          this.alertify.success('Graf przepływu sterowania został utworzony');
        },
        error => {
          console.log(error);
          this.alertify.error(error);
        }
      );
  }
  downloadSourceCodeAsFile() {}
  uploadVerificationData() {}
  uploadSourceCode() {}
  markTask() {}
  chooseProgrammingLanguage() {}

  judge(){
    (this.sourceWithInput = {
      source_code: this.code,
      language_id: 51,
      stdin: this.input,
      userId: +localStorage.getItem('userID'),
      algorithmTaskId: this.algorithmTaskId
    }),
    console.log(this.sourceWithInput);
    this.codeEditorService.JudgeCode(this.sourceWithInput).subscribe(
      result => {
        this.alertify.success('Algorytm został oceniony');
        this.resultInformation = result;
        console.log(result);
        //this.ngOnInit();
      }
      
      // error => {
      //   console.log(error);
      //   this.alertify.error(error);
      // }
    );
    this.alertify.success('Algorytm został oceniony');
  }

  setVerdict() {
    if (+this.resultInformation.time > this.algorithmTask.timeLimit) {
      this.verdictName = 'Time Limit Exceeded Verdict';
    } else if (this.resultInformation.memory > this.algorithmTask.memoryLimit) {
      this.verdictName = 'Memory Limit Exceeded Verdict';
    } else if (this.resultInformation.compile_output !== null) {
      this.verdictName = 'Compilation Error Verdict';
    } else if (this.resultInformation.stderr !== null) {
      this.verdictName = 'Runtime Error Verdict';
    } else if (
      this.resultInformation.stdout !==
      this.algorithmTask.verificationData.outputData
    ) {
      this.verdictName = 'Wrong Answer Verdict';
    } else if (this.resultInformation.stdout === 'hel') {
      this.verdictName = 'Correct Answer Verdict';
      // another method that check this parameters
      // } else if () {
      // lines of code
      // } else if () {
      // elementary operation
      // } else if () {
    } else {
      this.verdictName = 'Default Verdict';
    }
    console.log(this.verdictName);
  }

  saveVerdict() {
    console.log(this.resultInformation);
    const dec = parseFloat(this.resultInformation.time);
    this.verdict = {
      verdictName: 'das',
      elementaryOperation: 11,
      time: dec,
      memory: this.resultInformation.memory,
      complexityOrder: 11,
      timeToSolve: 11,
      linesOfCode: 11,
      solution: this.code,
      userId: +localStorage.getItem('userID'),
      algorithmTaskId: this.algorithmTaskId
    };

    this.codeEditorService.saveVerdict(this.verdict).subscribe(
      () => {
        this.alertify.success('Werdykt został dodany');
      },
      error => {
        console.log(error);
        this.alertify.error(error);
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
  openDialog(metrics: MetricsModel): void {
    if (this.metrics) {
      const dialogRef = this.dialog.open(MetricsDialog, {
        data: { metrics: this.metrics }
      });
    }
  }
  openDiagramDialog(controlFlowGraph: CFG): void {
    if (this.controlFlowGraph) {
      console.log(this.controlFlowGraph);
      const dialogRef = this.dialog.open(DiagramDialog, {
        data: { controlFlowGraph: this.controlFlowGraph }
      });
    }
  }
}
