import crypto from 'crypto';

const createHash = (text) => crypto
  .createHash('sha512')
  .update(text)
  .digest('base64url');

const text = 'Hola';
const sameText = 'Hola';
const modifiedText = 'hola';

console.log('Texto original:', text);
console.log('Texto modificado:', modifiedText);
console.log('Hash 1:', createHash(text));
console.log('Hash 2 con el mismo texto:', createHash(sameText));
console.log('Hash con texto ligeramente modificado:', createHash(modifiedText));
console.log('El mismo texto genera el mismo hash', createHash(text) === createHash(sameText));
console.log('El texto modificado genera el mismo hash', createHash(text) === createHash(modifiedText));
