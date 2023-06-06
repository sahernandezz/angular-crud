import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalComponent} from "../modal/modal.component";
import {Estado} from "../../shared/model/Estado";
import {HttpEstado} from "../../shared/http/http.estado";
import {HttpTarea} from "../../shared/http/http.tarea";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('modalComponent') private modal:
    | ModalComponent<FormComponent>
    | undefined;

  get tareaForm(): FormGroup {
    return this._tareaForm;
  }

  // @ts-ignore
  private _tareaForm: FormGroup;
  estados: Estado[] = [];

  constructor(
    private estadoHttp: HttpEstado,
    private tareaHttp: HttpTarea
  ) {
    this.listarEstados();
  }

  ngOnInit() {
    this._tareaForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    });
  }

  public submit(): void {
    this.agregarTarea();
    this.close().then(r => location.reload());
  }

  private listarEstados(): void {
    this.estadoHttp.listarEstados().subscribe((response: any) => {
      const list: Estado[] = response.items;
      this.estados = list;
    });
  }

  public agregarTarea(): void {
    const tituloText: string = this.tareaForm.value.titulo.charAt(0).toUpperCase()
      + this.tareaForm.value.titulo.slice(1).toLowerCase();

    const tarea: Object = {
      titulo: tituloText,
      descripcion: this.tareaForm.value.descripcion,
      fechaCreacion: new Date(),
      estado: Number(this.tareaForm.value.estado)
    }

    this.tareaHttp.crearTarea(tarea).subscribe((response: any) => null);
  }

  public async close(): Promise<void> {
    await this.modal?.close();
  }
}


