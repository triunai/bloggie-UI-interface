import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  // https://mycolor.space/gradient3?ori=to+right+bottom&hex=%23130923&hex2=%230A1426&hex3=%235FFBF1&submit=submit
  // https://cssbud.com/css-generator/css-glow-generator/#collapse4
  // https://library.livecanvas.com/sections/footer-3/

  blogposts$?: Observable<BlogPost[]>;

  constructor(
    private blogpostService: BlogPostService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.fetchBlogposts();
  }

  private fetchBlogposts() {
    this.blogposts$ = this.blogpostService.getAllBlogposts();
  }

  ngOnDestroy(): void {
    this.blogposts$
  }
}
