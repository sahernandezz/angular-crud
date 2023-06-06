import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Tarea} from "../model/Tarea";

@Injectable({
  providedIn: 'root'
})
export class HttpTarea {

  private readonly url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://gf45e9f189895df-db8jc7e.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/api/v1/tarea';
  }

  public listarTareas(): any {
    return this.http.get<Tarea[]>(this.url);
  }

  public listarTareasTerminadas(): any {
    return this.http.get<Tarea[]>(this.url + '/1');
  }

  public crearTarea(tarea: Object): any {
    return this.http.post<Tarea>(this.url, tarea);
  }

  public eliminarTarea(id: number): any {
    return this.http.delete<Tarea>(this.url + '/' + id);
  }

  public actualizarEstado(idTarea: number, idEstado: number): any {
    return this.http.put<Tarea>(this.url + '/' + idTarea, {estado: idEstado});
  }

}
