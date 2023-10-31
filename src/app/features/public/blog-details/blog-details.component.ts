import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit,OnDestroy{

  urlFromRoute: string | null = null;
  blogpost$?: Observable<BlogPost>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogpostService: BlogPostService
  ){}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params)=>{
        this.urlFromRoute = params.get('url');
      },
      error: (err)=>{
        console.error("Couldnt get the url from the activated route! try again!");
      }
    });

    // fetch blog details by url
    if(this.urlFromRoute){
      this.blogpost$ = this.blogpostService.getBlogpostsByUrl(this.urlFromRoute);
    }
  }

  ngOnDestroy(): void {

  }

}
