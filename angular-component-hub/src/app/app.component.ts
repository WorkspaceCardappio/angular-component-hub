import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AutocompleteComponent} from './shared/auto-complete/auto-complete.component';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutocompleteComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Autocomplete Genérico';
  users: User[] = [{
    id: 1,
    name: 'João Silva',
    email: 'joao@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a'
  }, {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria@example.com',
    avatar: 'https://i.pravatar.cc/150?u=b'
  }, {
    id: 3,
    name: 'Carlos Souza',
    email: 'carlos@example.com',
    avatar: 'https://i.pravatar.cc/150?u=c'
  }, {
    id: 4,
    name: 'Ana Rodrigues',
    email: 'ana@example.com',
    avatar: 'https://i.pravatar.cc/150?u=d'
  }, ];

  singleUser!: User;
  multipleUsers: User[] = [];
  isDisabled: boolean = false;

  formatUserForDisplay(user: any): string {
    return `${user.name} - ${user.email}`;
  }
  constructor() {}

  ngOnInit(): void {
    this.singleUser = this.users[1];
    this.multipleUsers = [this.users[0], this.users[3]];
  }

  searchUsers(query: string): Observable<any[]> {
    console.log('Buscando usuários com:', query);
    const lowerQuery = query.toLowerCase();
    console.log('Query em minúsculas:', lowerQuery);
    const filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(lowerQuery)
    );

    console.log(this.multipleUsers)

    return of(filteredUsers).pipe(delay(500));
  }

  onUserSelection(selection: any) {
    console.log('Seleção atual:', selection);
  }

}
