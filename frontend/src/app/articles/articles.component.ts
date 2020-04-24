import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import {UserService} from "../services/user.service";
import {ArticlesModel} from "../models/articles.model";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles : ArticlesModel[] = [];
  isLoading = false;
  isAdmin = false;
  userLogin : string;
  userId : number;

  constructor(public articlesService: ArticleService, public userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.articlesService.getArticles()
      .subscribe(articlesData =>{
        this.isLoading = false;
        this.articles = articlesData;
      });
  }

  onDelete(id: number) {

  }
}
