import { HttpClient } from "@angular/common/http";
import { afterRender, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private token: string | null = null;

  constructor(private http: HttpClient) {
    afterRender(() => {
      this.token = localStorage.getItem('token');
      this.isAuthenticated.next(!!this.token);
    });
  }

  register(name: string, email: string, password: string, re_password: string, age: number): Observable<any> {
    return this.http.post<any>('https://notes-mrp9.onrender.com/signup', {
      name,
      email,
      password,
      re_password,
      age
    });
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('https://notes-mrp9.onrender.com/signin', {
      email,
      password
    });
  }
  getToken(): string | null {
    return this.token;
  }
  isloggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
  logout(): void {
    this.token = null;
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
  }
}