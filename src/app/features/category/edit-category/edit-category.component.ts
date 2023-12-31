import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Categories } from '../models/categories.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit,OnDestroy{

  //define it up here
  id: string | null = null;
  category?: Categories;

  paramsSubscription?: Subscription; // <-- For routing purposes only
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getIdFromRoute();
  }

  onFormSubmit(){
    const updateModel = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ??''
    };

    // transform this object using service

    if(this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(updateModel, this.id).subscribe({
        next: (data) =>{
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.error("unable to update data, check params or api: "+error.message)
        }
      })
    }

  }

  getIdFromRoute(){
    this.paramsSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');  // <---getting value from route, check your app-routing for the *EXACT* variable
        if(this.id){
          this.categoryService.getCategoriesById(this.id).subscribe({
            next: (responseFromApi) =>{
              this.category = responseFromApi;
            }
          });
        }
      },
      error: () =>{
        alert("unable to return id, check route if it has anything");
      }
    });
  }

  onDelete(){
    // add from service
    if(this.id){
        this.deleteCategorySubscription = this.categoryService.deleteCategory(this.id).subscribe({
          next: (responseFromApi) =>{
            console.log(`This is the deleted category ${responseFromApi.id}, ${responseFromApi.name}, ${responseFromApi.urlHandle} `);
            this.router.navigateByUrl('/admin/categories');
          },
          error: (error) =>{
            console.error("Couldnt be deleted, maybe check id: "+error.message)
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe;
    this.editCategorySubscription?.unsubscribe;
    this.deleteCategorySubscription?.unsubscribe;
  }
}
