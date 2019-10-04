import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {

  mode: string;

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
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }
}
