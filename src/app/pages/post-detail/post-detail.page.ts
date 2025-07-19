import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../shared/models/post.model';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [DatePipe, NgIf],
  templateUrl: './post-detail.page.html',
  styleUrl: './post-detail.page.scss'
})
export class PostDetailPage {
  // post: Post | undefined;

  // Example static data (replace with real data/service in production)
  post: Post = {
      id: 1,
      title: 'Understanding Angular Signals',
      body: 'Full content of Angular Signals post lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      author : {
        email: 'a@gmail.com',
        id: 1,
        name: 'Bazeel Bin Waris',
        avatarUrl: 'https://i.pravatar.cc/100?img=1',
        bio: 'Angular Enthusiast & Blogger'
      },
      publishedDate: '2025-07-10'
    };

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      // this.post = this.posts.find(p => p.id === id);
    });
  }
}
