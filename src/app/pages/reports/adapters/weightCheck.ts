/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
let dynamicHeaders = [];

function addDynamicHeaders(header:string) {
  const headerIndex = dynamicHeaders.findIndex((element) => element === header);
  if (headerIndex === -1) {
    dynamicHeaders.push(header);
  }
}

function weightSpecie(adapter:any, weight:any) {
  const arrayweight:any[] = weight.weight_check_specie;

  arrayweight.forEach((element, i) => {
    addDynamicHeaders(`Especie${i + 1}`);
    adapter[`specie${i + 1}`] = element.specie;
    addDynamicHeaders(`Estado${i + 1}`);
    adapter[`state${i + 1}`] = element.state;
    addDynamicHeaders(`Peso${i + 1}`);
    adapter[`weight${i + 1}`] = element.weight;
  });

  return adapter;
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((weight) => {
    const adapter = {
      register_number: weight.register_number,
      create_by: weight.create_by.email,
      createdAt: weight.createdAt,
      motorShip: weight.motorShip.description,
      place: weight.place.description,
      updatedAt: weight.updatedAt,
    };
    return weightSpecie(adapter, weight);
  });
  return newData;
}

function headersToData() {
  const headers = ['N° de Registro', 'Creado por', 'Fecha de creación', 'Embarcación', 'Lugar de pesca', 'Fecha de actualización'];
  return headers;
}

export function weightCheckModel(arrayData:any[]) {
  const newData = adapterData(arrayData);
  let headers = headersToData();
  headers = headers.concat(dynamicHeaders);
  dynamicHeaders = [];
  const adapter = {
    arrayData: newData,
    headers,
  };
  return adapter;
}
