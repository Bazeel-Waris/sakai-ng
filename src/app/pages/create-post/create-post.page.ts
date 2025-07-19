import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { PostService } from '../../shared/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule, // <-- Use this
    ButtonModule
  ],
  templateUrl: './create-post.page.html',
  // styleUrls: ['./create-post.page.scss']
})
export class CreatePostPage {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const newPost = {
        ...this.postForm.value,
        author: user.name,
        publishedDate: new Date().toISOString().split('T')[0],
      };
      this.postService.createPost(newPost).subscribe({
        next: () => this.router.navigate(['/']),
        error: err => console.error('Error creating post', err)
      });
    }
  }
}
