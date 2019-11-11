Angular Material Icons for Ant Design
-------------------------------------

_This package using icons from [Material Design Icons](https://github.com/google/material-design-icons) repository, which is being maintained by Google._

1. Setting up
    ```typescript
    import {MatAccessibility} from 'material-design-icons-for-angular-ant-design';
    import { Component } from '@angular/core';
    import { NzIconService } from 'ng-zorro-antd';
    
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.scss'],
      providers: [
        NzIconService,
      ],
    })
    export class AppComponent {
      title = 'Angular Material Icons';
    
      constructor(private iconService: NzIconService) {
        this.iconService.addIcon(
          MatAccessibility,
        );
      }
    }
    ```
2. Usage
    ```angular2html
    <i nz-icon nzType="mat_accessibility"></i>
    ```
