import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  providers: [RecipeService],
  imports: [CommonModule, HttpClientModule],
})
export class HomeComponent {
  recipes$: Observable<any>;

  constructor(private recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getRecipeById();
  }
}
