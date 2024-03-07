import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class RecipeService {
  apiUrl = `/api/recipe`;

  constructor(private http: HttpClient) {}

  getRecipeById(): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    });

    return this.http
      .get<any>(`${this.apiUrl}/117083`, { headers: headers })
      .pipe(map((resp) => resp));
  }
}
