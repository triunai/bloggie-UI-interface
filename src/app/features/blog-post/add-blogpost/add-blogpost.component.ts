import { Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { AddBlogPostModel } from '../models/add-blog-post.model';
import { CategoryService } from '../../category/services/category.service';
import { Categories } from '../../category/models/categories.model';
import { BlogPost } from '../models/blog-post.model';
import { ImageService } from '../../shared/components/image-selector/image.service';



@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.scss']
})
export class AddBlogpostComponent implements OnInit,OnDestroy {

  model: AddBlogPostModel;
  categories$?: Observable<Categories[]>  // <-- Declare Subscription variable
  imageSelectorVisibilityFlag?: boolean = false;
  imageSelectSubscription$?: Subscription;

  constructor(
    private blogpostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ){
    this.model = {
      title:'',
      shortDescription:  '',
      content: '',
      featuredImageUrl:'',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),  // Format the date as 'yyyy-MM-dd'
      isVisible: true,
      categories: [],
    }
  }

  ngOnInit(): void {
    this.fetchCategories();
    // for initialising image selector

    this.imageSelectSubscription$ = this.imageService.onSelectImage().subscribe({
          // Do something with the new image
          next: (response) => {
            if(this.model){
              this.model.featuredImageUrl = response.fileUrl;
              this.closeImageSelector(); // closes it for you
            }
          },
          error: (err) => {
            console.error("Something worng happened "+err)
          }
        });
  }

  onFormSubmit(){
    console.log(this.model); // <-- to check two way data binding

    // <-- use ur logic, ur returning an observable, so you have to subscribe to it!
   this.blogpostService.createBlogPost(this.model).subscribe({
      next: (apiResponse) =>{
        console.log("Successful addition "+apiResponse.author)
        //add routing to blogpost list later
        this.router.navigateByUrl('/admin/blogposts')
      },
      error: (err) => {
        console.error("Error, couldnt insert, check api, or angular service class"+err.message)
      }
    });
  }

  fetchCategories(){
    this.categories$ = this.categoryService.getAllCategories();
  }

  openImageSelector(){
    this.imageSelectorVisibilityFlag = true;
  }

  closeImageSelector(){
    this.imageSelectorVisibilityFlag = false;
  }

  ngOnDestroy(): void {
    this.imageSelectSubscription$?.unsubscribe();
  }
}

