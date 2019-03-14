import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CourseApp';
  @Input() clickedHeader: string = "";

  clickedHeaderFunc(text: string) {
    console.log(text);
    this.clickedHeader = text;
  }
}
