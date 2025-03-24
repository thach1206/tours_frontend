import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit {
 
  constructor(private postService: PostService, private sanitizer: DomSanitizer) { }

  posts: any;

  ngOnInit(): void {
    window.scrollTo(0, 0)

    this.postService.getAllPost().subscribe(
      (data: any) => {
        console.log(data);

        this.posts = data.result;
        console.log("first call: ", this.posts)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  formatContent(content: string): SafeHtml {
    // Thêm style cho tất cả các thẻ <img> để max-width: 100%
    const modifiedContent = content.replace(/<img([^>]+)>/g, (match, p1) => {
      // Nếu <img> chưa có thuộc tính style, thêm max-width: 100%
      if (!p1.includes('style=')) {
        return `<img${p1} style="max-width: 100%; height: auto;">`;
      }
      // Nếu <img> đã có thuộc tính style, chỉ thêm max-width: 100%
      return `<img${p1.replace('style="', 'style="max-width: 100%; height: auto; ')}`;
    });
  
    // Thêm thẻ <br> cho mỗi ký tự xuống dòng (\n)
    const contentWithBreaks = modifiedContent.replace(/\n/g, '<br>');
    
    // Trả về nội dung HTML đã được thay đổi với sự bảo mật
    return this.sanitizer.bypassSecurityTrustHtml(contentWithBreaks);
  }
}
