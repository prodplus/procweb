export function toDateApi(d: Date): string {
  let m = '' + (d.getUTCMonth() + 1);
  let y = '' + d.getUTCFullYear();
  let x = '' + d.getUTCDate();

  if (m.length < 2) {
    m = '0' + m;
  }
  if (x.length < 2) {
    x = '0' + x;
  }

  return [y, m, x].join('-');
}

export function toDateTimeApi(d: Date): string {
  let m = '' + (d.getMonth() + 1);
  let y = '' + d.getFullYear();
  let x = '' + d.getDate();
  let h = '' + d.getHours();
  let i = '' + d.getMinutes();

  if (m.length < 2) {
    m = '0' + m;
  }
  if (x.length < 2) {
    x = '0' + x;
  }
  if (h.length < 2) {
    h = '0' + h;
  }
  if (i.length < 2) {
    i = '0' + i;
  }

  return [y, m, x].join('-') + ' ' + h + ':' + i;
}

export function toDateTimeString(d: Date): string {
  let m = '' + (d.getMonth() + 1);
  let y = '' + d.getFullYear();
  let x = '' + d.getDate();
  let h = '' + d.getHours();
  let i = '' + d.getMinutes();

  if (m.length < 2) {
    m = '0' + m;
  }
  if (x.length < 2) {
    x = '0' + x;
  }
  if (h.length < 2) {
    h = '0' + h;
  }
  if (i.length < 2) {
    i = '0' + i;
  }

  return [y, m, x].join('-') + 'T' + h + ':' + i;
}

export function toTimeString(d: Date): string {
  let h = '' + d.getHours();
  let m = '' + d.getMinutes();
  let s = '' + d.getSeconds();

  if (h.length < 2) {
    h = '0' + h;
  }
  if (m.length < 2) {
    m = '0' + m;
  }
  if (s.length < 2) {
    s = '0' + s;
  }

  return [h, m, s].join(':');
}

export function getMesExtenso(value: number): string {
  switch (value) {
    case 0:
      return 'janeiro';
    case 1:
      return 'fevereiro';
    case 2:
      return 'março';
    case 3:
      return 'abril';
    case 4:
      return 'maio';
    case 5:
      return 'junho';
    case 6:
      return 'julho';
    case 7:
      return 'agosto';
    case 8:
      return 'setembro';
    case 9:
      return 'outubro';
    case 10:
      return 'novembro';
    case 11:
      return 'dezembro';
    default:
      return 'janeiro';
  }
}
