import { Component, Inject } from '@angular/core';
import { VerdictRef } from './verdict-ref';
import { VERDICT_DATA } from './verdict.tokens';



@Component({
  selector: 'verdict',
  template: `
    <div class="overlay-content">
      <!-- <h1 *ngIf="image.badgeName !== 'null'" >Otrzymałeś odznakę {{image.badgeName}}</h1> -->
      <img [src]="image">
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      align-items: center;
      color: white;
      font-size: 1.8rem;
      font-family: "Raleway", sans-serif;
    }

    img {
      width: 20rem;
      max-width: 20rem;
      height: auto;
    }

    .overlay-content {
      padding: 1em;
    }
  `]
})
export class VerdictComponent {

  constructor(
    public dialogRef: VerdictRef,
    @Inject(VERDICT_DATA) public image: any) { }
}
