import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { Categories } from '../../category/models/categories.model';
import { UpdateBlogPostModel } from '../models/update-blog-post.model';
import { ImageService } from '../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.scss']
})
export class EditBlogpostComponent implements OnInit,OnDestroy {


  RouteSubscription?: Subscription; // <-- For routing purposes only
  editBlogpostSubscription?: Subscription;
  categories$?: Observable<Categories[]>;
  getBlogpost?: Subscription;
  deleteBlogpost?: Subscription;
  imageSelectSubscription$?: Subscription;

  id: string | null = null; // Declared here for routing logic
  model?: BlogPost; // <-- Acts as model for component, perform your business logic here!
  modelContent: string = '';
  selectedCategories?: string[];
  imageSelectorVisibilityFlag = false;
  paramsSubscription?:  Subscription;


  constructor(
    private activatedRoute: ActivatedRoute,
    private BlogPostService: BlogPostService,
    private CategoryService: CategoryService,
    private router: Router,
    private imageService: ImageService
  ){}

  ngOnInit(): void {
    this.getIdFromRoute();
    this.modelContent = this.model?.content || '';
    // console.log("ngOnInit: Initialized modelContent", this.modelContent);
    // this.getParsedMarkdown();
  }

  // convertToEmoji(text: string): string {
  //   const emojiMap: { [key: string]: string | undefined } = {
  //     ':heart:': '❤️',
  //     ':smile:': '😄',
  //     ':laugh:': '😂',
  //     ':wink:': '😉',
  //     ':sad:': '😔',
  //     ':angry:': '😡',
  //     ':surprise:': '😲',
  //     ':thumbs_up:': '👍',
  //     ':thumbs_down:': '👎',
  //     ':clap:': '👏',
  //     ':wave:': '👋',
  //     ':100:': '💯',
  //     ':fire:': '🔥',
  //     ':star:': '⭐',
  //     ':cake:': '🍰',
  //     ':gift:': '🎁',
  //     ':eyes:': '👀',
  //     ':sunglasses:': '😎',
  //     ':money_mouth:': '🤑',
  //     ':thinking:': '🤔',
  //     ':facepalm:': '🤦',
  //     ':rocket:': '🚀',
  //     ':earth:': '🌍',
  //     ':sun:': '☀️',
  //     ':moon:': '🌕',
  //     ':rainbow:': '🌈',
  //     ':coffee:': '☕',
  //     ':pizza:': '🍕',
  //     ':apple:': '🍎',
  //     ':orange:': '🍊',
  //     ':grapes:': '🍇',
  //     ':watermelon:': '🍉',
  //     ':muscle:': '💪',
  //     ':book:': '📚',
  //     ':pencil:': '✏️',
  //     ':camera:': '📷',
  //     ':music:': '🎵',
  //     ':trophy:': '🏆',
  //     ':alarm_clock:': '⏰',
  //     ':airplane:': '✈️',
  //     ':email:': '📧',
  //     ':tv:': '📺',
  //     ':phone:': '📱',
  //     ':computer:': '💻',
  //     ':bulb:': '💡',
  //     ':zipper_mouth:': '🤐',
  //     ':robot:': '🤖',
  //     ':unicorn:': '🦄',
  //     ':tada:': '🎉',
  //     ':confetti:': '🎊',
  //     ':balloon:': '🎈',
  //     ':gift_heart:': '💝',
  //     ':question:': '❓',
  //     ':exclamation:': '❗',
  //     ':zzz:': '💤',
  //     ':footprints:': '👣',
  //     ':peace:': '✌️',
  //     ':victory:': '✌️',
  //     ':crossed_fingers:': '🤞',
  //     ':fist:': '✊'
  //   };
  //   return text.replace(/:(\w+):/g, (match, p1) => emojiMap[match] || `:${p1}:`);
  // }

  // getParsedMarkdown(): string {  // <-- specify the return type
  //   console.log("parsedMarkdown: Current modelContent"+this.modelContent);

  //   if (!this.modelContent || typeof this.modelContent !== 'string') {
  //     console.error("parsedMarkdown: Didn't enter main method");
  //     return '';
  //   }

  //   if (!this.id) {
  //     console.error("parsedMarkdown: ID is not available");
  //     return '';
  //   }

  //   this.getBlogpost = this.BlogPostService.getBlogpostsById(this.id).subscribe({
  //     next: (blogpost) => {
  //       this.model = blogpost;

  //       if (!this.model) {
  //         console.error("parsedMarkdown: Model is not available");
  //       }

  //       this.modelContent = this.model.content;
  //       const convertedText = this.convertToEmoji(this.modelContent);
  //       console.log("parsedMarkdown: Converted Text", convertedText, "Model Content", this.modelContent);
  //     },
  //     error: (err: any) => {
  //       console.error("parsedMarkdown: Try later lil bro");
  //     }
  //   });
  //   console.log("still not enterig main method");
  //   return '';  // <-- Added a default return value
  // }


  getIdFromRoute(){
    this.RouteSubscription = this.activatedRoute.paramMap.subscribe({
      next: (routeInformation) => {
        this.id = routeInformation.get('id');
        if(this.id){
          console.log('ID from route:', this.id);  // Add this line in getIdFromRoute method

          this.categories$ = this.CategoryService.getAllCategories(); // to select blogposts

          this.getBlogpost = this.BlogPostService.getBlogpostsById(this.id).subscribe({
            next: (posts) => {
              this.model = posts;
              this.selectedCategories = posts.categories.map( category => category.id ); // to preselect categories and initialize
            },
            error: (err) => {
              console.error("Couldnt get the right id!")
            }
          })
        }

        // for initialising image selector

        this.imageSelectSubscription$ = this.imageService.onSelectImage().subscribe({
          // Do something with the new image
          next: (response) => {
            if(this.model){
              this.model.featuredImageUrl = response.fileUrl;
              this.imageSelectorVisibilityFlag = false; // closes it for you
            }
          },
          error: (err) => {
            console.error("Something worng happened "+err)
          }
        });
      },
      error: (err: any) => {
        console.error("unable to return route from id!, check");
      }
    });
  }

  onFormSubmit(){
    // Convert the model to a request object
    if(this.model && this.id){
      let updateBlogPost: UpdateBlogPostModel = {
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        content: this.model.content,
        author: this.model.author,
        publishedDate: this.model.publishedDate,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ? this.selectedCategories : []
      };

      if(this.id){
        this.editBlogpostSubscription = this.BlogPostService.updateBlogpostById(updateBlogPost, this.id).subscribe({
          next: (data) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
          error: (err) => {
            console.error("unable to update data, check params or api"+err.message)
        }
      })
      }

    }
  }

  onDelete(){
    if(this.id){
      this.deleteBlogpost = this.BlogPostService.deleteBlogpost(this.id).subscribe({
        next: (data) => {
          console.log(`This was deleted ${data.id},${data.author} ,`);
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (err) => {
          console.error("Couldnt be deleted, maybe check id again "+err);
      }
    })
    }
  }

  openImageSelector(){
    this.imageSelectorVisibilityFlag = true;
  }

  closeModal(){
    this.imageSelectorVisibilityFlag = false;
  }
  ngOnDestroy(): void {
    this.RouteSubscription?.unsubscribe();
    this.editBlogpostSubscription?.unsubscribe();
    this.getBlogpost?.unsubscribe();
    this.deleteBlogpost?.unsubscribe();
    this.imageSelectSubscription$?.unsubscribe();
  }

}
