import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { Router, RouterModule } from '@angular/router';
import { _FilterCoreModule, _SharedMenuModule, _SortModule, ClientSideRowModelModule, CustomFilterModule, DateFilterModule, ModuleRegistry, NumberFilterModule, PaginationModule, TextFilterModule, ValidationModule, type ColDef } from 'ag-grid-community';

// Register AG Grid modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  _SharedMenuModule,
  _FilterCoreModule,
  _SortModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  CustomFilterModule,
  ValidationModule
]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AgGridModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  columnDefs: ColDef[] = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Excerpt',
      field: 'excerpt',
      sortable: true,
      filter: true,
      flex: 2,
      valueGetter: params => params.data.excerpt?.length > 200 ? params.data.excerpt.slice(0, 200) + '...' : params.data.excerpt
    },
    { headerName: 'Author', field: 'author', sortable: true, filter: true, flex: 1 },
    { headerName: 'Published Date', field: 'publishedDate', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Action',
      cellRenderer: (params: any) => `<a class="read-more-btn" href="/post/${params.data.id}">Read More</a>`,
      flex: 0.7,
      sortable: false,
      filter: false
    }
  ];

  rowData = [
    {
      id: 1,
      title: 'Understanding Angular Signals',
      excerpt: 'Angular 17 introduced a new reactive primitive called signals...',
      author: 'Bazeel Bin Waris',
      publishedDate: '2025-07-10'
    },
    {
      id: 2,
      title: 'NestJS Authentication with JWT',
      excerpt: 'Secure your APIs using Passport.js and JSON Web Tokens...',
      author: 'Ali Khan',
      publishedDate: '2025-07-08'
    },
    {
      id: 3,
      title: 'Getting Started with PrimeNG',
      excerpt: 'PrimeNG provides a wide range of UI components ready for enterprise applications...',
      author: 'Fatima Noor',
      publishedDate: '2025-07-07'
    },
    {
      id: 4,
      title: 'Building with AG Grid in Angular',
      excerpt: 'AG Grid is the gold standard for data grids. Let’s explore integration with Angular...',
      author: 'Ahmed Raza',
      publishedDate: '2025-07-06'
    },
    {
      id: 5,
      title: 'Express vs NestJS: A Developer’s Guide',
      excerpt: 'While both are great Node.js frameworks, they serve different needs...',
      author: 'Zara Sheikh',
      publishedDate: '2025-07-05'
    },
    {
      id: 6,
      title: 'Why PostgreSQL is Better than MySQL',
      excerpt: 'PostgreSQL offers powerful features, ACID compliance, and extensibility...',
      author: 'John Doe',
      publishedDate: '2025-07-04'
    }
  ];

  constructor(private router: Router) { }

  onRowClicked(event: any) {
    const postId = event.data.id;
    if (postId) {
      this.router.navigate(['/post', postId]);
    }
  }
}
