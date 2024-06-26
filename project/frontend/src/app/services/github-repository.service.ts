import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";
import { GithubRepository, GithubRepositoryCreateRequest, GithubRepositoryUpdateRequest } from "../models/repositories";
import { AppConstant } from "../app.constant";

@Injectable({
  providedIn: 'root'
})
export class GithubRepositoryService {
  constructor(private http: HttpClient) {}

  get(): Observable<GithubRepository> {
    const endpoint = AppConstant.API_URL + AppConstant.API_PATHS.REPOSITORIES.GITHUB.GET;
    return this.http.get<GithubRepository>(endpoint)
      .pipe(
        catchError(err => {
          console.error('Error getting Github repositories:', err);
          return of();
        })
      );
  }

  create(formData: GithubRepositoryCreateRequest): Observable<GithubRepository> {
    const endpoint = AppConstant.API_URL + AppConstant.API_PATHS.REPOSITORIES.GITHUB.CREATE;

    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<GithubRepository>(endpoint, formData, { headers })
      .pipe(
        tap(res => console.log('Successfully created repository:', res)),
        catchError(err => {
          console.error('Error creating repository:', err);
          return of();
        })
      );
  }

  update(formData: GithubRepositoryUpdateRequest): Observable<GithubRepository> {
    const endpoint = AppConstant.API_URL + AppConstant.API_PATHS.REPOSITORIES.GITHUB.UPDATE;
    return this.http.post<GithubRepository>(endpoint, formData)
      .pipe(
        tap(res => console.log('Successfully updated repository:', res)),
        catchError(err => {
          console.error('Error updating repository:', err);
          return of();
        })
      );
  }

  delete(id: number): Observable<void> {
    const endpoint = AppConstant.API_URL + AppConstant.API_PATHS.REPOSITORIES.GITHUB.DELETE;
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<void>(endpoint, { params })
      .pipe(
        tap(res => console.log('Successfully deleted repository:', res)),
        catchError(err => {
          console.error('Error deleting repository:', err);
          return of();
        })
      );
  }

  getBranches(): Observable<string[]> {
    const endpoint = AppConstant.API_URL + AppConstant.API_PATHS.REPOSITORIES.GITHUB.BRANCHES;
    return this.http.get<string[]>(endpoint)
      .pipe(
        catchError(err => {
          console.error('Error getting Github branches:', err);
          return of();
        })
      );
  }
}
