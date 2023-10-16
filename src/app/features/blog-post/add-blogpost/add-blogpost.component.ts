import { Component} from '@angular/core';
import { AddBlogPostModel } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.scss']
})
export class AddBlogpostComponent  {

  model: AddBlogPostModel;

  constructor(
    private blogpostService: BlogPostService,
    private router: Router,
  ){
    this.model = {
      title:'',
      shortDescription:  '',
      content: '',
      featuredImageUrl:'',
      urlHandle: '',
      author: '',
      publishedDate: new Date(),  // Format the date as 'yyyy-MM-dd'
      isVisible: true
    }
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
}

