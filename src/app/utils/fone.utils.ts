export function getMascaraFone(fone: string): string {
  if (fone && fone.charAt(2) && fone.charAt(2) == '9') {
    return '(00) 00000-0000';
  } else {
    return '(00) 0000-0000';
  }
}
