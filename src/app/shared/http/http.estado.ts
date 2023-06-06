import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Estado} from "../model/Estado";

@Injectable({
  providedIn: 'root'
})
export class HttpEstado {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://gf45e9f189895df-db8jc7e.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/v1/estado';
  }

  public listarEstados(): any {
    return this.http.get<Estado[]>(this.url);
  }
}
