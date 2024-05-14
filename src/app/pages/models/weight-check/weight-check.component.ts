import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from 'src/app/services/swalNotification/swal.service';
import Swal from 'sweetalert2';
import { WeightCheckService } from './weight-check.service';

@Component({
  selector: 'app-weight-check',
  templateUrl: './weight-check.component.html',
  styleUrls: ['./weight-check.component.scss'],
})
export class WeightCheckComponent implements OnInit {
  public searchWeightCheck:string;

  public weightCheckArray = [];

  public numberDataShow: number = 10;

  public numberPages: number = 0;

  public totalLengthOfCollection: number;

  public formEditWeightCheck: FormGroup;

  public formEditSpecie: FormGroup;

  public formEditPeople: FormGroup;

  // Control de vistas
  id_view: number = 0;

  posSpecie: number;

  posMeasurement: number;

  modal: NgbModalRef;

  sub_modal: NgbModalRef;

  statusArray: string[] = ['EVISC CON ESCAMA', 'TRONCO', 'COLA', 'FILETE', 'LIMPIO - CON UÑA', 'DESCABEZADO', 'ENTERO'];

  // Jumm?
  public formSubmitted = false;

  public boatArray: [] = [];

  public specieArray: [] = [];

  public siteArray: [] = [];

  public userArray: [] = [];

  // public formConfigBannerGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal,
    private weightCheckService: WeightCheckService,
    public routes: Router,
    private swal: SwalService
  ) {
    this.getWeightCheck(true);
    this.initForms();
  }

  /**
   * La función obtiene todos las mediciones
   *
   * @returns void
   */
  getWeightCheck(status:boolean) {
    this.swal.notificationLoading('Procesando petición!!');
    this.weightCheckService.getWeightCheck(status).subscribe(
      (result: any) => {
        this.weightCheckArray = result.items;
        this.totalLengthOfCollection = result.total;
        // console.log(this.weightCheckArray);
        this.swal.closeNotificationLoading();

        this.weightCheckService.getSpecies(true).subscribe(
          (efect: any) => {
            this.specieArray = efect.items;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.weightCheckService.getFishingSite(true).subscribe(
          (efect: any) => {
            this.siteArray = efect.items;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.weightCheckService.getBoat(true).subscribe(
          (efect: any) => {
            this.boatArray = efect.items;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );

        this.weightCheckService.getUsers(true).subscribe(
          (efectuado: any) => {
            this.userArray = efectuado.items;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );
      },
      (error) => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Error!!',
            icon: 'error',
            html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
          }).then(() => {
            this.routes.navigate(['/login']);
          });
        } else {
          Swal.fire({
            title: 'Error!!',
            icon: 'error',
            html: error.error.message,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
          });
        }
      },
    );
    this.id_view = 0;
  }

  /**
   * Función para obtener la posición del arte de pesca
   *
   * @param idBanner id del arte de pesca
   * @returns retorna la posición del arte de pesca
   */
  getPositionWeightCheck(idWeightCheck:string) {
    const position = this.weightCheckArray
      .findIndex((weightCheck: any) => weightCheck._id === idWeightCheck) + 1;
    return position;
  }

  ngOnInit(): void {
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModal() {
    this.modal.close();
    this.ngOnInit();
  }

  /**
   * La función sirve para cerrar los modales
   *
   * @returns void
   */
  closeModalS() {
    this.sub_modal.close();
    this.ngOnInit();
  }

  /**
  * La función inicializa el formulario para agregar weightCheck de tipo FormGroup
  *
  * @returns void
  */
  initForms() {
    this.formEditWeightCheck = this.formBuilder.group({
      _id: [''],
      register_number: [''],
      motorShip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      place: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      create_by: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      issue_date: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      weight_check_specie: ['', [Validators.required, Validators.minLength(1)]],
      signatureInstitution: ['', [Validators.required, Validators.minLength(4)]],
      signatureRegister: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.formEditSpecie = this.formBuilder.group({
      _id: [''],
      specie: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      state: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      weight: [0, [Validators.required, Validators.min(1), Validators.maxLength(15)]],
    });

    this.formEditPeople = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
    });
  }

  /**
   * Abre el modal para editar el arte de pesca
   *
   * @param editWeightCheckModal Modal que se va desplegar para editar
   * @param weightCheck Data del arte de pesca seleccionado
   */
  openModalEdit(editWeightCheckModal:NgbModal, weightCheck, pos) {
    this.formSubmitted = false;

    this.posSpecie = 0;
    this.posMeasurement = pos;
    this.modal = this.modalService.open(editWeightCheckModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditWeightCheck.reset();

    this.formEditWeightCheck.patchValue({
      _id: weightCheck._id,
      register_number: weightCheck.register_number,
      motorShip: weightCheck.motorShip,
      place: weightCheck.place,
      create_by: weightCheck.create_by._id,
      issue_date: this.transformEpoch(weightCheck.issue_date),
      weight_check_specie: weightCheck.weight_check_specie,
      signatureInstitution: weightCheck.signatureInstitution,
      signatureRegister: weightCheck.signatureRegister,
    });
    (<HTMLInputElement>document.getElementById('institution-signature')).setAttribute('src', weightCheck.signatureInstitution);
    (<HTMLInputElement>document.getElementById('register-signature')).setAttribute('src', weightCheck.signatureRegister);
  }

  /**
   * Abre el modal para editar la especie
   *
   * @param editWeightCheckModal Modal que se va desplegar para editar
   */
  openModalEditSpecie(editWeightCheckModal:NgbModal, speciePos) {
    this.formSubmitted = false;

    this.sub_modal = this.modalService.open(editWeightCheckModal, {
      centered: true,
      backdrop: 'static',
    });

    this.formEditSpecie.reset();

    this.formEditSpecie.patchValue({
      _id: this.formEditWeightCheck.value.weight_check_specie[speciePos]._id,
      specie: this.formEditWeightCheck.value.weight_check_specie[speciePos].specie,
      state: this.formEditWeightCheck.value.weight_check_specie[speciePos].state,
      weight: this.formEditWeightCheck.value.weight_check_specie[speciePos].weight,
    });
  }

  /**
   * Guarda los cambios realizados a las mediciones
   *
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  updateDataWeightCheck() {
    this.formSubmitted = true;
    const hoy = new Date();
    const dateParse = `${this.formEditWeightCheck.value.issue_date} ${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;

    if (this.formEditWeightCheck.invalid) {
      // console.log('ERROR WE');
      // console.log(this.formEditWeightCheck);
    } else {
      this.formEditWeightCheck.patchValue({
        issue_date: Date.parse(dateParse),
      });
      const dataForm = this.formEditWeightCheck.value;
      delete dataForm.register_number;
      this.weightCheckService
        .updateWeightCheck(dataForm).subscribe(
          (result: any) => {
            Swal.fire({
              title: 'Procesando petición!!',
              html: result.message,
              showCancelButton: false,
              showConfirmButton: false,
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              },
              timer: 2000,
            });
            this.getWeightCheck(true);
            this.modalService.dismissAll();
            this.formSubmitted = false;
          },
          (error) => {
            if (error.status === 401) {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              }).then(() => {
                this.routes.navigate(['/login']);
              });
            } else {
              Swal.fire({
                title: 'Error!!',
                icon: 'error',
                html: error.error.message,
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
              });
            }
          },
        );
    }
  }

  /**
   * Cambios guardados en la especie
   *
   * @param selected Especie seleccionada
   */
  saveChangeSpecie(selected) {
    this.formSubmitted = true;

    if (this.formEditSpecie.invalid) {
      // console.log('ERROR WE');
    } else {
      const arrayMod = this.formEditWeightCheck.value.weight_check_specie;
      arrayMod[this.posSpecie] = selected;
      this.formEditWeightCheck.patchValue({
        weight_check_specie: arrayMod,
      });
      this.sub_modal.close();
      if (this.posSpecie !== 0) {
        this.posSpecie = 0;
      } else if (arrayMod.length > 1) {
        this.posSpecie = 1;
      } else if (arrayMod.length === 1) {
        this.posSpecie = 0;
      }
    }
  }

  /**
   * Cambia el estado de un usuario
   *
   * @param weightCheck Id del usuario
   * @returns Cambios guardados con éxito o el mensaje de error
   * predeterminado
   */
  changeStatus(weightCheck) {
    const status = weightCheck.is_active;

    this.weightCheckService
      .disableWeightCheck({ id: weightCheck._id, is_active: !status }).subscribe(
        (result: any) => {
          Swal.fire({
            title: 'Procesando petición!!',
            html: result.message,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
            timer: 2000,
          });
          this.getWeightCheck(true);
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire({
              title: 'Error!!',
              icon: 'error',
              html: 'Tiempo de sesión expirado, inicie sesión nuevamente',
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            }).then(() => {
              this.routes.navigate(['/login']);
            });
          } else {
            Swal.fire({
              title: 'Error!!',
              icon: 'error',
              html: error.error.message,
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false,
            });
          }
        },
      );
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEdit(field: string): string {
    let message = '';
    if (this.formEditWeightCheck.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditWeightCheck.get(field)!.hasError('minlength')) {
      const minLength = this.formEditWeightCheck.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditWeightCheck.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditWeightCheck.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditWeightCheck.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    }

    return message;
  }

  /**
   * Administra los mensajes de error para datos de edición
   *
   * @param field Campo a validar
   * @returns De acuerdo al error que tenga el campo asigna el mensaje respectivo,
   * si no hubo ningún error no se asigna el mensaje al campo.
   */
  getErrorMessageEditSpecie(field: string): string {
    let message = '';
    if (this.formEditSpecie.get(field)!.hasError('required')) {
      message = 'Este campo es requerido';
    } else if (this.formEditSpecie.get(field)!.hasError('minlength')) {
      const minLength = this.formEditSpecie.get(field)!.errors?.minlength.requiredLength;
      message = `Este campo debe tener un minimo de ${minLength} caracteres`;
    } else if (this.formEditSpecie.get(field)!.hasError('maxlength')) {
      const maxLength = this.formEditSpecie.get(field)!.errors?.maxlength.requiredLength;
      message = `Este campo debe tener un maximo de ${maxLength} caracteres`;
    } else if (this.formEditSpecie.get(field)!.hasError('pattern')) {
      message = 'Este campo es invalido';
    } else if (this.formEditSpecie.get(field)!.hasError('min')) {
      const min = this.formEditSpecie.get(field)!.errors?.min.min;
      message = `Este campo debe ser mayor a ${min}`;
    } else if (this.formEditSpecie.get(field)!.hasError('max')) {
      const max = this.formEditSpecie.get(field)!.errors?.max.max;
      message = `Este campo debe ser menor que ${max}`;
    }

    return message;
  }

  /**
   * Validación de los campos a editar
   *
   * @param field Campo a validar
   * @returns Verifica que el campo sea correcto al formato, en
   * caso contrario retorna false
   */
  invalidField(field: string): boolean {
    if (this.formEditWeightCheck.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Validación de los campos a editar
   *
   * @param field Campo a validar
   * @returns Verifica que el campo sea correcto al formato, en
   * caso contrario retorna false
   */
  invalidFieldSpecie(field: string): boolean {
    if (this.formEditSpecie.get(field)!.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  /**
   * Trae los datos de la base de datos inactivos
   */
  giveDataOff(status) {
    this.weightCheckArray = [];
    this.getWeightCheck(status);
    if (status === false) {
      this.id_view = 1;
    } else {
      this.id_view = 0;
    }
  }

  /**
   * Pinta bien el rol del usuario
   */
  filtroDataMaximus(idData, array, tipo) {
    let string = '';

    if (tipo === 1) {
      array.forEach((element: any) => {
        if (element._id === idData) {
          string = element.email;
        }
      });
    } else if (tipo === 2) {
      array.forEach((element: any) => {
        if (element._id === idData) {
          string = element.common_name;
        }
      });
    } else {
      array.forEach((element: any) => {
        if (element._id === idData) {
          string = element.description;
        }
      });
    }
    return string;
  }

  /**
   * Transforma las fechas en formato epoch
   *
   * @param epoch Formato de fecha en número
   * @returns String con la fecha
   */
  transformEpoch(epoch) {
    const data = new Date(epoch);
    let dia = '';
    let mes = '';
    if (data.getDate() < 10) {
      dia = `0${data.getDate()}`;
    } else {
      dia = data.getDate().toString();
    }

    if ((data.getMonth() + 1) < 10) {
      mes = `0${data.getMonth() + 1}`;
    } else {
      mes = (data.getMonth() + 1).toString();
    }
    const string = `${data.getFullYear()}-${mes}-${dia}`;

    return string;
  }

  /**
   * Determina la posición de la información escogida.
   *
   * @param event Data escogida
   */
  onChange(event: any) {
    this.posSpecie = event.target.value;
  }
}
