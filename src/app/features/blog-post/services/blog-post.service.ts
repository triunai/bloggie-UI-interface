import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddBlogPostModel } from '../models/add-blog-post.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPostModel } from '../models/update-blog-post.model';


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

  // since you connected the tables in your api, make necessary changes to your model first
  getAllBlogposts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogpost`)
    .pipe(
      tap((data) => console.log('Successfully fetched all blogposts!!'+data)),
      catchError(err => {
        console.error('Error fetching blogposts!', err.message, 'Status Code:', err.status);

        return of([]);
      })
    );
  }

  getBlogpostsById(id: string): Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`);
  }

  updateBlogpostById(model: UpdateBlogPostModel, id: string): Observable<BlogPost>{
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`, model);
  }

  deleteBlogpost(id: string): Observable<BlogPost>{
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${id}`)
  }

  getBlogpostsByUrl(urlHandle: string):Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogpost/${urlHandle}`);
  }
}

