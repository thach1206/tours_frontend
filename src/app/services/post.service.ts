import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  uploadImages(arg0: FormDataEntryValue | null, arg1: FormDataEntryValue | null) {
    const url = this.POST_PATH + `/${arg0}/uploadImages`;
    return this.http.put<any>(url, arg1);
  }


  POST_PATH: string = 'http://localhost:8080/post'


  constructor(private http: HttpClient) { }

  getAllPost(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(this.POST_PATH);
  }

  uploadPost(form: any) : Observable<PostResponse> {
    const url = this.POST_PATH + `/${form.idPost}`;

    // tao updatedPost tu interface va form
    const updatePost = {
      idPost: form.idPost,
      titlePost: form.titlePost,
      statusAction: form.statusAction,
      status: form.status,
      description: form.description,
      contentPost: form.contentPost,
      image: form.image
    }

    return this.http.put<PostResponse>(url, updatePost);
  }

  deletePost(currentId: string) :Observable<DeleteResponse> {
    const url = this.POST_PATH + `/${currentId}`;

    return this.http.delete<DeleteResponse>(url);
  }

  getPostById(isPost: string): Observable<PostResponse> {
    return this.http.get<PostResponse>(this.POST_PATH + `/${isPost}`);
  }

  createPost(form: any) : Observable<PostResponse>{
    const url = this.POST_PATH;

    const createPost = {
      titlePost: form.titlePost,
      statusAction: "ACTIVE",
      status: "ACTIVE",
      description: form.description,
      contentPost: form.contentPost,
      type: form.type,
      image: form.image
    }
    return this.http.post<PostResponse>(url, createPost);
  }
}

interface PostsResponse{
  code: string,
  result: Post[]
}

interface DeleteResponse{
  code: string,
  result: any
}


interface PostResponse{
  code: string,
  result: Post
}

interface Post {
  idPost: number;
  titlePost: string;
  description: string;
  contentPost: string;
  status: string;
  vote: number;
  type: string | null;
  view: number;
  statusAction: string | null;
  dateAdded: string; // ISO date string
  dateEdited: string; // ISO date string
  dateDeleted: string | null;
  image: string | null // Assuming array of image URLs or paths
}
