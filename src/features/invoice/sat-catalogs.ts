// Minimal sample of SAT catalogs for demo purposes.
// In real-world use, load the official CSVs.
export const REGIMEN = [
  { code: '601', name: 'General de Ley Personas Morales' },
  { code: '612', name: 'Personas Físicas con Actividades Empresariales' },
  { code: '626', name: 'Régimen Simplificado de Confianza (RESICO)' },
]

export const USO_CFDI = [
  { code: 'G01', name: 'Adquisición de mercancías' },
  { code: 'G03', name: 'Gastos en general' },
  { code: 'P01', name: 'Por definir' },
]

export const FORMA_PAGO = [
  { code: '01', name: 'Efectivo' },
  { code: '02', name: 'Cheque nominativo' },
  { code: '03', name: 'Transferencia electrónica' },
  { code: '99', name: 'Por definir' },
]

export const UNIDADES = [
  { code: 'H87', name: 'Pieza' },
  { code: 'E48', name: 'Unidad de servicio' },
  { code: 'MTR', name: 'Metro' },
]

export const PROD_SERV = [
  { code: '43230000', name: 'Software' },
  { code: '82141600', name: 'Servicios de diseño' },
  { code: '81111800', name: 'Servicios de programación' },
  { code: '27110000', name: 'Impresiones 3D' },
]
