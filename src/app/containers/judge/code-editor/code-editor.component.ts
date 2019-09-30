import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit {
  editorOptions = {theme: 'vs',
                   language: 'csharp',
                   contextmenu: 'true',
                   codelens: 'true',
                   colorDecorators: 'true',
                   formatOnType: 'true'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';
  constructor() { }

  ngOnInit() {
  }

}
