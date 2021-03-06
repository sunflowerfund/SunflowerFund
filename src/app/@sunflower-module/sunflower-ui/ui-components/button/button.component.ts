import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "sunflower-button",
  template: `
    <div [class]="classes"><ng-content></ng-content></div>

    <!-- 
    This is code that renders the code for a button.
    How it works:
    
      <sunflower-button type="primary" [attrs]="['--large','--danger']">Button</sunflower-button>

    The * type * attribute is to specify which version of the button.
    The * attrs * is an array of conditions that will influence the feel
    of this component.

    Note: This only makes use of ng-content. Whatever is within the element/tags will be displayed.
          * You can pass the attrs thr 
 -->
  `,
})
export class ButtonComponent implements OnInit {
  @Input()
  type: string;
  @Input()
  class: string;
  @Input()
  attrs: string[];
  constructor() {}

  ngOnInit() {}
  get classes(): string {
    return `btn btn-${this.type} ${
      this.attrs ? this.attrs.join().replace(",", " ") : ""
    } ${this.class}`;
  }
}
