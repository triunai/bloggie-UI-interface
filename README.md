# Thanatos 🌌

### README for Bloggie UI Interface 📘

#### Introduction 🚀
This repository contains the Angular-based front-end for the Bloggie application. It provides a user-friendly interface for interacting with the Bloggie API, offering features like authentication, blog management, and more.

#### Structure 🏗️
- **App Module**: The main module that bootstraps the application. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/app.module.ts)
- **App Component**: The root component that hosts the application. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/app.component.ts)
- **Navbar Component**: A reusable component for the navigation bar. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/core/components/navbar/navbar.component.ts)
- **Footer Component**: A reusable component for the footer. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/core/components/footer/footer.component.html)

#### Authentication & Security 🔐
- **Auth Guards**: Used for protecting routes based on user authentication status. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/features/auth/guards/auth.guard.ts)
- **Interceptors**: Handle HTTP requests and responses, particularly for adding authentication tokens. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/core/interceptors/auth.interceptor.ts)
- **Login/Logout Functionality**: Manages user sessions with secure login and logout capabilities.
- **Cookie Storage**: Utilizes `ngx-cookie-service` for secure cookie management.

#### Features 🌟
- **Category Management**: Add, edit, and list blog categories.
  - **Add Category Component**: [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/features/category/add-category/add-category.component.ts)
  - **Edit Category Component**: [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/features/category/edit-category/edit-category.component.ts)
  - **Category List Component**: [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/features/category/category-list/category-list.component.ts)
- **Image Upload**: Shared component for image upload functionality. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/features/shared/components/image-selector/image-selector.component.ts)
- **Markdown Support**: Implements `ngx-markdown` for rendering markdown content.

#### Models 📋
- **AddCategoryRequest**: Model for adding a new category. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/features/category/models/add-category-request.models.ts)
- **UpdateCategoryRequest**: Model for updating an existing category. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/features/category/models/update-category-request.model.ts)
- **Category**: Model for category data. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/features/category/models/categories.model.ts)

#### Code Samples 💻
1. **Add Category Component**:
    ```typescript
    // add-category.component.ts
    import { Component } from '@angular/core';
    import { AddCategoryRequest } from '../models/add-category-request.model';
    
    @Component({
      selector: 'app-add-category',
      templateUrl: './add-category.component.html',
      styleUrls: ['./add-category.component.scss']
    })
    export class AddCategoryComponent {
      model: AddCategoryRequest;
      // ... 
    }
    ```

#### Additional Information ℹ️
- **Routing**: The application uses Angular's built-in routing. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/app-routing.module.ts)
- **Styles**: Global styles can be added in `styles.scss`. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/styles.scss)

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help 🆘
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
