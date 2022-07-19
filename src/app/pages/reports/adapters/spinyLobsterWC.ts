/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
let dynamicHeaders = [];

function addDynamicHeaders(header:string) {
  const headerIndex = dynamicHeaders.findIndex((element) => element === header);
  if (headerIndex === -1) {
    dynamicHeaders.push(header);
  }
}

function weightSpecie(adapter:any, spinyLobster:any) {
  const arrayweight:any[] = spinyLobster.weight_check_specie;

  arrayweight.forEach((element, i) => {
    addDynamicHeaders(`Observaciones${i + 1}`);
    adapter[`observations${i + 1}`] = element.observations;
    addDynamicHeaders(`sexo${i + 1}`);
    adapter[`sex${i + 1}`] = element.sex;
    addDynamicHeaders(`talla(cm)${i + 1}`);
    adapter[`size${i + 1}`] = element.size;
    addDynamicHeaders(`ovadas${i + 1}`);
    adapter[`ovate${i + 1}`] = `${element.ovate}`;
    addDynamicHeaders(`Peso${i + 1}`);
    adapter[`weight${i + 1}`] = element.weight;
  });

  return adapter;
}

function namesPeopleSampling(adapter:any, spinyLobster:any) {
  const arrayweight:any[] = spinyLobster.names_people_sampling;
  arrayweight.forEach((element, i) => {
    addDynamicHeaders(`personasQueRealizanMuestreo${i + 1}`);
    adapter[`name${i + 1}`] = element.name;
  });
  return weightSpecie(adapter, spinyLobster);
}

function adapterData(arrayData:any[]) {
  const newData = arrayData.map((spinyLobster) => {
    const adapter = {
      register_number: spinyLobster.register_number,
      create_by: spinyLobster.create_by.email,
      createdAt: spinyLobster.createdAt,
      motorShip: spinyLobster.motorShip.description,
      place: spinyLobster.place.description,
      updatedAt: spinyLobster.updatedAt,
      totalWeight: spinyLobster.total_weight,
      productsBelowSize: spinyLobster.products_below_size,
      numberOfOvateFemales: spinyLobster.number_of_ovate_females,
      numberOfTailsBelowSize: spinyLobster.number_of_tails_below_size,
    };
    return namesPeopleSampling(adapter, spinyLobster);
  });
  return newData;
}

function headersToData() {
  const headers = ['N° de registro', 'Creado por', 'Fecha de creación', 'Embarcación', 'Lugar de pesca', 'Fecha de actualización', 'Peso total', 'Producto por debajo de la talla', 'Números de hembras ovadas', 'Número de colas por debajo de la talla'];
  return headers;
}

export function spinyLobsterWC(arrayData:any[]) {
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
