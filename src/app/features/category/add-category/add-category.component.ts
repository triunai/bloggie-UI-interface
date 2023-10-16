import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription ;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }


  //void type by default
  onFormSubmit(){
    console.log(this.model);
    this.addCategorySubscription = this.categoryService.addCategory(this.model).subscribe({
      next: (response) => {
          console.log("Successful add" +response);
          this.router.navigateByUrl('/admin/categories');
      },
      error: (error: { message: string; }) => {
        console.error('Error, model wasnt added or data wasnt bound properly'+error.message);
    }
  });

  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
