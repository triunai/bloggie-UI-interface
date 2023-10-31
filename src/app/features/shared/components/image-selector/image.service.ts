import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImageModel } from '../models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // to trigger or emit multiple values of an observable, and subscribers who  have subscribed will receive the values of these observables
  selectedImage: BehaviorSubject<BlogImageModel> = new BehaviorSubject<BlogImageModel>({
    id: '',
    title : '',
    fileExtension : '',
    fileName : '',
    fileUrl : '',
  });

  constructor(private http: HttpClient) { }

  // Upload image
  // Ensure key name matches API params and args
  uploadImage(file: File, fileName: string, title: string):Observable<BlogImageModel>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.http.post<BlogImageModel>(`${environment.apiBaseUrl}/api/images`, formData);
  }

  getAllImages():Observable<BlogImageModel[]>{
    return this.http.get<BlogImageModel[]>(`${environment.apiBaseUrl}/api/images`);
  }

  // returns nothing because its just changing the value of the behaviour subject
  selectImage(image: BlogImageModel){
    // changes the value of the current behaviour to the image being passed in the request, will come from controller to here
    this.selectedImage.next(image);
    }

  onSelectImage(): Observable<BlogImageModel>{
    return this.selectedImage.asObservable() // observer becomes the observable itself!
  }
}
