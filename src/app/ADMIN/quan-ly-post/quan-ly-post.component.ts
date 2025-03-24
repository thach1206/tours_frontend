import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';

declare var bootstrap: any;

@Component({
  selector: 'app-quan-ly-post',
  templateUrl: './quan-ly-post.component.html',
  styleUrl: './quan-ly-post.component.css'
})
export class QuanLyPostComponent implements OnInit {

  imagePreviews: string[] = [];
  currentId: string = '-1';

  posts: any;
  constructor(private postService: PostService, private sanitizer: DomSanitizer) { }

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'align': [] }]
    ]
  };

  form: any = {
    idPost: null,
    titlePost: null,
    description: null,
    status: "ACTIVE",
    contentPost: null,
    vote: 0,
    type: null,
    view: 0,
    statusAction: null,
    image: null,
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.getAllPost();
  }

  editPost(idPost: string) {
    this.postService.getPostById(idPost).subscribe(
      (data: any) => {
        this.form = data.result;
      }
    )
  }

  deletePost() {
    this.postService.deletePost(this.currentId).subscribe(
      (data: any) => {
        console.log(data.result)
        const modalElement = document.getElementById('deleteModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.getAllPost();

      },
      (error) => {
        console.log(error)
      }
    )
  }

  setPostId(id: string) {
    this.currentId = id;
  }

  getAllPost() {
    this.postService.getAllPost().subscribe(
      (data: any) => {
        this.posts = data.result;
      },
      (error) => {
        console.log(error)
      }
    )
  }


  // Hàm xử lý khi người dùng chọn ảnh
  onFileSelected(event: any): void {
    const file = event.target.files[0];  // Chỉ lấy file đầu tiên nếu có nhiều ảnh
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.image = e.target.result;  // Gán URL của ảnh vào form.image
      };
      reader.readAsDataURL(file);  // Đọc file dưới dạng URL
    }
  }

  saveChanges() {
    this.postService.uploadPost(this.form).subscribe(
      (res) => {
        console.log('Post uploaded successfully:', res);
        const modalElement = document.getElementById('editPostModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.getAllPost();
      },
      (error) => {
        console.error('Error uploading post:', error);
      }
    );
  }

  createPost() {
    this.postService.createPost(this.form).subscribe(
      (res) => {
        console.log('Post creation successfully:', res);
        const modalElement = document.getElementById('createPostModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        this.getAllPost();
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
}
