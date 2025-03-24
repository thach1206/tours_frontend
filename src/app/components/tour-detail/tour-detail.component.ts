import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../common/tour';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.css'
})
export class TourDetailComponent implements OnInit {
  constructor(private tourService: TourService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private postService: PostService) { }
  tour?: Tour;
  posts: any[] = [];
  tourId: string = '';

  tourRatingResponse: number = -1;


  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.tourId = this.route.snapshot.paramMap.get('id')!;

    this.getTourById(this.tourId);
    this.postService.getAllPost().subscribe(
      (res) => {
        this.posts = res.result
      }
    );

    this.getTourRatingById(this.tourId);
  }

  getTourRatingById(tourId: string) {
    this.tourService.getTourRatingById(tourId).subscribe(
      (data: any) => {
        console.log("getTourRatingById")
        console.log(data.result);
        this.tourRatingResponse = data.result.avgRating;
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getTourById(tourId: string) {
    this.tourService.getTourById(tourId).subscribe(
      (data: any) => {
        this.tour = data.result;
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
