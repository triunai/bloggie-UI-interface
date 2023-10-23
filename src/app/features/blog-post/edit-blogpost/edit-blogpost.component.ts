import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { Categories } from '../../category/models/categories.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.scss']
})
export class EditBlogpostComponent implements OnInit,OnDestroy {

  RouteSubscription?: Subscription; // <-- For routing purposes only
  categories$?: Observable<Categories[]>;

  id: string | null = null; // Declared here for routing logic
  model?: BlogPost; // <-- Acts as model for component
  selectedCategories?: string[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private BlogPostService: BlogPostService,
    private CategoryService: CategoryService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getIdFromRoute();
  }

  getIdFromRoute(){
    this.RouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (routeInformation) => {
        this.id = routeInformation.get('id');
        if(this.id){
          console.log('ID from route:', this.id);  // Add this line in getIdFromRoute method

          this.categories$ = this.CategoryService.getAllCategories(); // to select blogposts
          this.BlogPostService.getBlogpostsById(this.id).subscribe({
            next: (posts) => {
              this.model = posts;
              this.selectedCategories = posts.categories.map( category => category.id );
              console.info('Blog post from route:', this.model);
            },
            error: (err) => {
              console.error("Couldnt get the right id!")
            }
          })
        }
      },
      error: (err: any) => {
        console.error("unable to return route from id!, check");
      }
    });
  }

  onFormSubmit(){
    console.log('implementation loaidng!');
  }

  ngOnDestroy(): void {
    this.RouteSubscription?.unsubscribe();
  }

}
