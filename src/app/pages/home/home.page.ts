import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { Router, RouterModule } from '@angular/router';
import { _FilterCoreModule, _SharedMenuModule, _SortModule, ClientSideRowModelModule, CustomFilterModule, DateFilterModule, ModuleRegistry, NumberFilterModule, PaginationModule, TextFilterModule, ValidationModule, type ColDef } from 'ag-grid-community';
import { PostService } from '../../shared/services/post.service';
import { Post } from '../../shared/models/post.model';

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
export class HomePage implements OnInit {

  columnDefs: ColDef[] = [
    { headerName: 'Title', field: 'title', sortable: true, filter: true, flex: 1 },
    {
      headerName: 'Excerpt',
      field: 'body',
      sortable: true,
      filter: true,
      flex: 2,
      valueGetter: params => params.data.body?.length > 200 ? params.data.body.slice(0, 200) + '...' : params.data.body
    },
    { 
      headerName: 'Author', 
      field: 'User.name', 
      sortable: true, 
      filter: true, 
      flex: 1,
      valueGetter: params => params.data.User?.name || 'Unknown'
    },
    { 
      headerName: 'Published Date', 
      field: 'createdAt', 
      sortable: true, 
      filter: true, 
      flex: 1,
      valueGetter: params => new Date(params.data.createdAt).toLocaleDateString()
    },
    {
      headerName: 'Action',
      cellRenderer: (params: any) => `<a class="read-more-btn" href="/post/${params.data.id}">Read More</a>`,
      flex: 0.7,
      sortable: false,
      filter: false
    }
  ];

  rowData: Post[] = [];
  currentPage = 1;
  totalPages = 0;
  loading = false;

  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(page: number = 1) {
    this.loading = true;
    this.postService.getPosts(page).subscribe({
      next: (response) => {
        this.rowData = response.posts;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    });
  }

  onRowClicked(event: any) {
    const postId = event.data.id;
    if (postId) {
      this.router.navigate(['/post', postId]);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadPosts(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.loadPosts(this.currentPage - 1);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
