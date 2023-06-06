import {Component, Injectable, OnInit} from '@angular/core';
import {Tarea} from "../../shared/model/Tarea";
import {Estado} from "../../shared/model/Estado";
import {ModalService} from "../../modal/modal.service";
import {FormComponent} from "../form/form.component";
import {HttpTarea} from "../../shared/http/http.tarea";
import {HttpEstado} from "../../shared/http/http.estado";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  tareas: Tarea[] = [];
  estados: Estado[] = [];

  tipo: boolean = true;
  alert: boolean = false;
  messageAlert: string = '';

  headers: string[] = ['Título', 'Descripción', 'Fecha', 'Estado', 'Acción'];

  constructor(
    private modalService: ModalService<FormComponent>,
    private tareaHttp: HttpTarea,
    private estadoHttp: HttpEstado
  ) {
  }

  ngOnInit(): void {
    this.listarEstados();
    this.listarTareas();
  }

  public listarTareas(): void {
    this.tareaHttp.listarTareas().subscribe((response: any) => {
      const list: Tarea[] = response.items;
      this.tareas = [...list]
      this.tipo = true;
    });
  }

  public listarTareasTerminadas(): void {
    this.tareaHttp.listarTareasTerminadas().subscribe((response: any) => {
      const list: Tarea[] = response.items;
      this.tareas = [...list]
      this.tipo = false;
    });
  }

  public listarEstados(): void {
    this.estadoHttp.listarEstados().subscribe((response: any) => {
      const list: Estado[] = response.items;
      this.estados = list;
    });
  }

  public async show(): Promise<void> {
    await this.modalService.open(FormComponent);
  }

  public eliminarTarea(id: number): void {
    this.tareaHttp.eliminarTarea(id).subscribe((response: any) => {
      this.tareas = this.tareas.filter((tarea: Tarea) => tarea.id !== id);
      this.alertMessage('Tarea eliminada correctamente');
    }, (error: any) => {
      this.alertMessage('Error al eliminar la tarea');
    });
  }

  public actualizarEstado(idTarea: number, idEstado: number): void {
    this.tareaHttp.actualizarEstado(idTarea, idEstado).subscribe((response: any) => {
      this.alertMessage('Estado de la tarea actualizado correctamente');
    }, (error: any) => {
      this.alertMessage('Error al actualizar el estado de la tarea');
    });
  }

  public alertMessage(message: string) {
    this.messageAlert = message;
    this.alert = true;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

  protected readonly Number = Number;
}
