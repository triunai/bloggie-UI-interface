import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categories } from '../models/categories.model';
import { environment } from 'src/environments/environment.development';
import { UpdateCategoryRequest } from 'src/app/features/category/models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  getCategoriesById(id: string): Observable<Categories>{
    return this.http.get<Categories>(`${environment.apiBaseUrl}/api/categories/${id}`,);
  }
  //modified this to handle Async Pipes
  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${environment.apiBaseUrl}/api/categories`)
      .pipe(
        tap(() => console.log('Successfully fetched categories from category service!!')),
        catchError(error => {
          console.error('Error fetching categories:', error);
          return of([]); // return an empty array if there's an error
        })
      );
  }


  //must return this type to insert anyway
  addCategory(model: AddCategoryRequest): Observable<void> {

    //writing post here is important, and ensure the method is also post
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories?addAuth=true`, model,);
  }

  // implementation for update method

  updateCategory(model: UpdateCategoryRequest, id: string): Observable<Categories>{
    return this.http.put<Categories>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`, model);
  }

  deleteCategory(id: string): Observable<Categories>{
    return this.http.delete<Categories>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`);
  }

}
