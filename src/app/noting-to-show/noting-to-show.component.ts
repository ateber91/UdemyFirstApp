import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-noting-to-show',
  templateUrl: './noting-to-show.component.html',
  styleUrls: ['./noting-to-show.component.css']
})
export class NotingToShowComponent implements OnInit {
  message: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.message = this.route.snapshot.data['message'];
    this.route.data.subscribe((data: Data) => {
      this.message = data['message'];
    });
  }
}
