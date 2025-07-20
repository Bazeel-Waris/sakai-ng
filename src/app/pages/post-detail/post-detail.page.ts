import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../shared/models/post.model';
import { PostService } from '../../shared/services/post.service';
import { DatePipe, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-post-detail',
  imports: [DatePipe, NgIf, ToastModule, RouterModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './post-detail.page.html',
  styleUrl: './post-detail.page.scss'
})
export class PostDetailPage implements OnInit {
  post: Post | undefined;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadPost(id);
      }
    });
  }

  loadPost(id: number) {
    this.loading = true;
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load post. Please try again.'
        });
        this.loading = false;
        this.router.navigate(['/']);
      }
    });
  }
}
