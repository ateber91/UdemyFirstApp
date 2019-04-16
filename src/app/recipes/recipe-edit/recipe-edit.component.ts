import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { isNull, ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  allowEdit = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] == null) {
            this.allowEdit = false;
          } else {
            this.allowEdit = true;
            this.id = params['id'];
          }
        }
      );
  }
}
