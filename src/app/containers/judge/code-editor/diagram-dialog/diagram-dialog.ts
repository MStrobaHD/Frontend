import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DiagramModel } from 'src/app/core/models/judge/diagram.model';
import { Subject } from 'rxjs';
import { ClusterNode, Node, Edge, Layout } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { CFG } from 'src/app/core/models/judge/control-flow-graph.model';

@Component({
  styleUrls: ['diagram-dialog.scss'],
  selector: 'diagram-dialog',
  templateUrl: 'diagram-dialog.html'
})
export class DiagramDialog {
  name = 'NGX-Graph Demo';

  nodes: Node[];
  // clusters: ClusterNode[] = this.clusters;

  links: Edge[];

  layout: String | Layout = 'dagreCluster';
  layouts: any[] = [
    {
      label: 'Dagre',
      value: 'dagre'
    },
    {
      label: 'Dagre Cluster',
      value: 'dagreCluster',
      isClustered: true
    },
    {
      label: 'Cola Force Directed',
      value: 'colaForceDirected',
      isClustered: true
    },
    {
      label: 'D3 Force Directed',
      value: 'd3ForceDirected'
    }
  ];

  // line interpolation
  curveType = 'Bundle';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];

  draggingEnabled = false;
  panningEnabled = true;
  zoomEnabled = true;

  zoomSpeed = 0.1;
  minZoomLevel = 0.1;
  maxZoomLevel = 4.0;
  panOnZoom = true;

  autoZoom = false;
  autoCenter = false;

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<DiagramDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DiagramData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data.controlFlowGraph[0].edges);
    this.setInterpolationType(this.curveType);
    //this.nodes = this.data.controlFlowGraph.nodes;
    //this.links = this.data.controlFlowGraph.edges;
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  setLayout(layoutName: string): void {
    const layout = this.layouts.find(l => l.value === layoutName);
    this.layout = layoutName;
    if (!layout.isClustered) {
      // this.clusters = undefined;
    } else {
      // this.clusters = clusters;
    }
  }
}

export interface DiagramData {
  controlFlowGraph: CFG;
}
