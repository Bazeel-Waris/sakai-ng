import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { PostService } from '../../shared/services/post.service';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    ToastModule,
    RouterModule
  ],
  providers: [MessageService],
  templateUrl: './create-post.page.html',
  // styleUrls: ['./create-post.page.scss']
})
export class CreatePostPage {
  postForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.loading = true;
      const postData = {
        title: this.postForm.value.title,
        body: this.postForm.value.body
      };

      this.postService.createPost(postData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Post created successfully!'
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error?.message || 'Failed to create post. Please try again.'
          });
          this.loading = false;
        }
      });
    } else {
      this.postForm.markAllAsTouched();
    }
  }
}
