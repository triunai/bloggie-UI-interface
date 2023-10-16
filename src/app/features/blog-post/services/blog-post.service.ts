import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddBlogPostModel } from '../models/add-blog-post.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BlogPost } from '../models/blog-post.model';


@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(
    private http: HttpClient,
  ) { }

  createBlogPost(model: AddBlogPostModel): Observable<BlogPost>{
    //  this works because its returning an observable type and the method is defining an observable anyway
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogpost`, model);
  }

  // use ur logic, why in the hell would a getAll method not return an array of the datatype of the apiResponse
  getAllBlogposts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogpost`)
    .pipe(
      tap(() => console.log('Successfully fetched categories!')),
      catchError(err => {
        console.error('Error fetching categories!', err.message, 'Status Code:', err.status);

        return of([]);
      })
    );
  }
}
