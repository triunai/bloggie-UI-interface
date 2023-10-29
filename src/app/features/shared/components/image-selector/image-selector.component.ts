import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogImageModel } from '../models/blog-image.model';
import { ImageService } from './image.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {

  private file?: File;
  model: BlogImageModel = {
    title: '',
    fileName: '',
    fileExtension: '',
    fileUrl: '',
  }

  images$?: Observable<BlogImageModel[]>; // ensure its an array because this is gonna hold the fetch/getAl data

  @ViewChild('form', {static: false}) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService){

  }
  ngOnInit(): void {
    this.fetchImages();
  }
  onFileUploadChange(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0]; // or use if(element.files?)
  }

  uploadImage(){
    if(this.file && this.model &&this.model.title !=='' && this.model.fileName !==''){
      // image service to upload an image
      this.imageService.uploadImage(this.file, this.model.fileName, this.model.title).subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.fetchImages();
        },
        error: (error) => {
          console.error("yeah upload isnt working!"+this.model.title, error);
        }
      })
  }else {
    console.log("yeah we didnt hit the main if!")
  }
}

  selectImage(model: BlogImageModel): void {

  }

  private fetchImages(){
    this.images$ = this.imageService.getAllImages();
  }
}
