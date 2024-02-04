import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RecipeService } from './services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [RecipeService],
})
export class AppComponent {
  recipes$: Observable<any>;

  constructor(private recipeService: RecipeService) {
    this.recipes$ = this.recipeService.getRecipeById();
  }
}
