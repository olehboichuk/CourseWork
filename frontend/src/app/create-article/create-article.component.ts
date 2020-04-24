import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TopicModel} from "../models/topic.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ArticleService} from "../services/article.service";
import {ArticleModel} from "../models/article.model";

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  private createArticleForm: FormGroup;
  private articleTopics: TopicModel [];
  private loading = false;

  constructor(public articleService: ArticleService, private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.createArticleForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      articleTopics: ['', Validators.required],
    });

    this.articleService.getTopics()
      .subscribe(
        topics => {
          this.articleTopics = topics;
        },
        err => {
          console.log(err);
        });
  }

  onSubmit() {
    this.loading = true;
    let topicListIds: number[] = [];
    for (let i in this.createArticleForm.get('articleTopics').value) {
      topicListIds[i] = this.createArticleForm.get('articleTopics').value[i].id;
    }
    const article = <ArticleModel>{
      title: this.createArticleForm.get('title').value,
      content: this.createArticleForm.get('content').value,
      topicIds: topicListIds
    };
    this.createArticleForm.controls['title'].disable();
    this.createArticleForm.controls['content'].disable();
    this.createArticleForm.controls['articleTopics'].disable();
    this.articleService.createArticle(article).subscribe(data => {
      // this.router.navigate(['/article-list']);
      this.router.navigate(['/teacher-profile']);
      console.log('article created');
    }, error => {
      console.warn(error);
      this.loading = false;
      this.createArticleForm.controls['title'].enable();
      this.createArticleForm.controls['content'].enable();
      this.createArticleForm.controls['articleTopics'].enable();
    });
  }

}
