import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ReportsService } from './reports.service';
import modelos from './arrayModel.json';
import { exportCsv } from '../../generateReports/csv/index';
import { selectAdapterModel } from './adapters/index';
import { formattedArrayData } from './formatData/arrayModels';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  reportArray: [];

  inputData = false;

  selectTrue = false;

  arrayName: any;

  optionsArray = [{ id: 'greater', description: 'Mayor a' }, { id: 'less', description: 'Menor a' }];

  modelsArray = [
    { id: 'activitie', description: 'Actividades' },
    { id: 'measurement', description: 'Mediciones' },
    { id: 'monitoring', description: 'Desembarco' },
    { id: 'weight-check', description: 'Verificación de peso' },
    { id: 'industrial-vessel-inspection', description: 'Inspección Industrial' },
    { id: 'spiny-lobster-sw-check', description: 'Tallas y medidas Langosta Espinosa' },
    { id: 'agricultural-producer-form', description: 'Productores Agricolas' },
    { id: 'costs-and-income', description: 'Costos e Ingresos' },
    { id: 'monitoring-agricultural-prices', description: 'Seguimiento de precios agrícolas' },
  ];

  reportForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportsService,
    public routes: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reportForm = this.formBuilder.group({
      model: ['', [Validators.required]],
      filter: ['', [Validators.required]],
      date: ['', [Validators.required]],
      item: [''],
    });
  }

  getReport(callbackCSV?:any) {
    let data: any;
    const dateTime = new Date(this.reportForm.value.date).getTime();
    if (this.reportForm.value.filter === 'greater') {
      data = {
        greater: dateTime,
      };
    } else if (this.reportForm.value.filter === 'less') {
      data = {
        less: dateTime,
      };
    }

    if (this.reportForm.invalid) {
      // console.log('ERROR WE');
      // console.log(this.reportForm);
    } else {
      Swal.fire({
        title: 'Procesando petición!!',
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const desub = this.reportService.consultGeneral(this.reportForm.value.model, data).subscribe(
        (res: any) => {
          this.reportArray = res.items;
          // console.log(res.items);
          // console.log(this.reportForm.value.model);
          if (callbackCSV) {
            callbackCSV(this.reportArray, this.reportForm.value.model);
          }
          desub.unsubscribe();
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

  changeModel(event) {
    this.arrayName = modelos[event];
    // console.log(event);
  }

  /**
   * Detecta los cambios de un checkbox
   */
  checkInput(event: any) {
    if (event.target.checked) {
      this.selectTrue = true;
    } else {
      this.selectTrue = false;
    }
  }

  reportsExportCsv(reportArray:any[], idModel:string) {
    const quantitydataModels = reportArray.length;
    if (quantitydataModels === 0) {
      Swal.fire('Advertencia', 'Filtro de fecha erróneo, verifique la fecha', 'warning');
    } else {
      const reportArrayFormat = formattedArrayData(reportArray);
      const adapterModel = selectAdapterModel(idModel);
      if (adapterModel === null) {
        Swal.fire('Advertencia', 'No existe el modelo seleccionado', 'warning');
      } else {
        const csvData = adapterModel(reportArrayFormat);
        Swal.close();
        exportCsv(csvData.arrayData, csvData.headers);
      }
    }
  }

  warningAlert(message:string) {
    Swal.fire({
      title: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  }
}
