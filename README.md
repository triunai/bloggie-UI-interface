# Thanatos

### README for Bloggie UI Interface

#### Introduction
This repository contains the Angular-based front-end for the Bloggie application. It provides a user interface for interacting with the Bloggie API.

#### Structure
- **App Module**: The main module that bootstraps the application. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/app.module.ts)
- **App Component**: The root component that hosts the application. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/app.component.ts)
- **Navbar Component**: A reusable component for the navigation bar. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/core/components/navbar/navbar.component.ts)
- **Footer Component**: A reusable component for the footer. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/core/components/footer/footer.component.html)

#### To-Do: Category Components
- **Add Category Component**: A component to add new categories.
- **Edit Category Component**: A component to edit existing categories.
- **Category List Component**: A component to list all categories.

#### Models
- **AddCategoryRequest**: Model for adding a new category.
- **UpdateCategoryRequest**: Model for updating an existing category.
- **Category**: Model for category data.

#### Code Samples
1. **Add Category Component**
    \`\`\`typescript
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
    \`\`\`

2. **Edit Category Component**
    \`\`\`typescript
    // edit-category.component.ts
    import { Component } from '@angular/core';
    import { UpdateCategoryRequest } from '../models/update-category-request.model';
    
    @Component({
      selector: 'app-edit-category',
      templateUrl: './edit-category.component.html',
      styleUrls: ['./edit-category.component.scss']
    })
    export class EditCategoryComponent {
      model: UpdateCategoryRequest;
      // ... 
    }
    \`\`\`

3. **Category List Component**
    \`\`\`typescript
    // category-list.component.ts
    import { Component } from '@angular/core';
    import { Category } from '../models/category.model';
    
    @Component({
      selector: 'app-category-list',
      templateUrl: './category-list.component.html',
      styleUrls: ['./category-list.component.scss']
    })
    export class CategoryListComponent {
      categories: Category[];
      // ... 
    }
    \`\`\`

#### Additional Information
- **Routing**: The application uses Angular's built-in routing. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/app/app-routing.module.ts)
- **Styles**: Global styles can be added in `styles.scss`. [View Code](https://github.com/triunai/bloggie-UI-interface/blob/master/src/styles.scss)

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
