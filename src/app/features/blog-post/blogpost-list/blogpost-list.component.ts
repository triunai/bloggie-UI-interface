import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.scss']
})
export class BlogpostListComponent implements OnInit {

  // initialize an empty array to fetch your data first
  blogposts$?: Observable<BlogPost[]>

  //and then use ngoninit to fetch it all


  constructor(
    private blogpostService: BlogPostService
  ){}

  ngOnInit(): void {
    this.fetchBlogposts();
  }



  private fetchBlogposts() {
    this.blogposts$ = this.blogpostService.getAllBlogposts();
  }


}
