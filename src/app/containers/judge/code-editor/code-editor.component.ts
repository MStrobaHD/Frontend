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
import { MetricsDialogComponent } from './metrics-dialog/metrics-dialog';
import { Observable } from 'rxjs';
import { MetricsModel } from 'src/app/core/models/judge/metrics.model';
import { SourceCodeInputModel } from 'src/app/core/models/judge/source-code-input.model';
import * as shape from 'd3-shape';
// import { DiagramDialog } from './diagram-dialog.ts/diagram-dialog';
import { CFG } from 'src/app/core/models/judge/control-flow-graph.model';
import { DiagramModel } from 'src/app/core/models/judge/diagram.model';
import { DiagramDialog } from './diagram-dialog/diagram-dialog';
import { ImagePreviewService } from 'src/app/shared/layout/image-preview-overlay/image-preview.service';
import { ImagePreviewOverlayRef } from 'src/app/shared/layout/image-preview-overlay/image-preview-ref';
import {
  BadgeAddModel,
  BadgeModel
} from 'src/app/core/models/user/badge.model';
import { VerdictService } from 'src/app/shared/layout/verdict-displayer/verdict.service';
import { VerdictRef } from 'src/app/shared/layout/verdict-displayer/verdict-ref';
import { ConfirmDialogComponent } from 'src/app/shared/layout/confirm-dialog/confirm-dialog';

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
  algorithmTaskName: string;
  verdict: VerdictModel;
  metrics: MetricsModel;
  controlFlowGraph: CFG[];
  verdictName: string;
  verdictBadge: BadgeModel;

  confirm = false;

  constructor(private route: ActivatedRoute,
              private algorithmTaskService: AlgorithmTaskService,
              private alertify: AlertifyService,
              private codeEditorService: CodeEditorService,
              public dialog: MatDialog,
              private verdictService: VerdictService)
  {
    this.code;
    this.algorithmTask = this.route.snapshot.data.algorithmTask;
  }

  ngOnInit() {
    this.algorithmTask = this.route.snapshot.data.algorithmTask;

    this.route.params.subscribe(params => {
      this.algorithmTaskId = +params.id;
      this.algorithmTaskName = params.taskName;
    });
  }
  getAlgorithmTask() {
    this.algorithmTaskService
      .getAlgorithmTaskForSolveAsync(this.algorithmTaskId)
      .subscribe(result => {
        this.algorithmTask = result;
      });
  }
  showPreview(file) {
    const dialogRef: VerdictRef = this.verdictService.open({
      image: file
    });
    setTimeout(() => {
      dialogRef.close();
    }, 4000);
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
          this.alertify.success('Kod żródłowy został skompilowany');
        },
        error => {
          this.alertify.error('Brak kodu żródłowego');
        }
      );
    } else if (this.input !== '') {
      (this.sourceWithInput = {
        source_code: this.code,
        language_id: 51,
        algorithmTaskName: this.algorithmTaskName,
        stdin: this.input,
        userId: +localStorage.getItem('userID'),
        algorithmTaskId: this.algorithmTaskId
      }),
        this.codeEditorService
          .compileSourceCodeWithInput(this.sourceWithInput)
          .subscribe(
            result => {
              this.resultInformation = result;
              this.ngOnInit();
              this.alertify.success(
                'Kod żródłowy z danymi wejściowymi został skompilowany'
              );
            },
            error => {
              this.alertify.error('Brak kodu żródłowego');
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
          this.alertify.success('Metryki zostały obliczone');
          this.openDialog(this.metrics);
        },
        error => {
          this.alertify.error('Brak kodu żródłowego');
        }
      );
  }
  analyzeSourceCode() {
    (this.sourceCFG = {
      source_code: this.code
    }),
      this.codeEditorService.analyze(this.sourceCFG).subscribe(
        (data: CFG[]) => {
          this.controlFlowGraph = data;
          this.ngOnInit();
          this.openDiagramDialog(this.controlFlowGraph);
          this.alertify.success('Graf przepływu sterowania został utworzony');
        },
        error => {
          this.alertify.error('Brak kodu żródłowego');
        }
      );
  }
  downloadSourceCodeAsFile() {}
  uploadVerificationData() {}
  uploadSourceCode() {}
  markTask() {}
  chooseProgrammingLanguage() {}

  judge() {
      (this.sourceWithInput = {
        source_code: this.code,
        language_id: 51,
        algorithmTaskName: this.algorithmTaskName,
        stdin: this.input,
        userId: +localStorage.getItem('userID'),
        algorithmTaskId: this.algorithmTaskId
      }),
        console.log(this.sourceWithInput);
      this.codeEditorService.JudgeCode(this.sourceWithInput).subscribe(
        result => {
          this.showPreview(this.getImageForVerdict(result.verdict));
          this.alertify.success('Algorytm został oceniony');
        },
        error => {
          this.alertify.error('Brak kodu żródłowego');
        }
      );
  }

  getImageForVerdict(verdict: string) {
    if (verdict === 'Accepted') {
      return '../../../../assets/verdicts/ac.png';
    } else if (verdict === 'NotAccepted') {
      return '../../../../assets/verdicts/nac.png';
    } else if (verdict === 'TimeLimitExceeded') {
      return '../../../../assets/verdicts/TLE.png';
    } else if (verdict === 'MemoryLimitExceeded') {
      return '../../../../assets/verdicts/MLE.png';
    } else if (verdict === 'CompilationError') {
      return '../../../../assets/verdicts/ce.png';
    } else if (verdict === 'RuntimeError') {
      return '../../../../assets/verdicts/ce.png';
    } else if (verdict === 'Plagiat') {
    return '../../../../assets/verdicts/pl.png';
  }
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
        this.alertify.error('Brak kodu żródłowego');
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
      const dialogRef = this.dialog.open(MetricsDialogComponent, {
        data: { metrics: this.metrics }
      });
    }
  }
  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // width: '350px',
      data: {
        message:
          'Uwaga przesyłaj zadanie do oceny jeśli jesteś pewny rozwiązania. Czy w takim razie chcesz przesłać zadanie ?',
        buttonYes: 'Tak',
        buttonNo: 'Nie'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.confirm = result;
      if (this.confirm === true) {
        this.judge();
      } 
    });
  }

  openDiagramDialog(controlFlowGraph: CFG[]): void {
    if (this.controlFlowGraph) {
      const dialogRef = this.dialog.open(DiagramDialog, {
        data: { controlFlowGraph: this.controlFlowGraph }
      });
    }
  }
}
