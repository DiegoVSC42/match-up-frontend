import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private API = `${environment.matchupApi}/lista/formatar-lista`;

  constructor(private http: HttpClient) {}

  formatarLista(texto: string): Observable<string[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      Accept: 'application/json', // Esperamos JSON na resposta
    });

    // Envia o texto diretamente como corpo da requisição
    return this.http.post<string[]>(this.API, texto, { headers });
  }
}
