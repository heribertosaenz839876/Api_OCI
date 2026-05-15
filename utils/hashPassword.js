import crypto from 'crypto';

const HASH_ALGORITHM = 'sha512';
const HASH_ENCODING = 'base64url';
const SALT_BYTES = 24;

const getPepper = () => process.env.PEPPER || '';

export const hashPassword = (password) => {
  const salt = crypto.randomBytes(SALT_BYTES).toString(HASH_ENCODING);
  const pepper = getPepper();
  const textToHash = `${salt}${pepper}${password}`;
  const hash = crypto
    .createHash(HASH_ALGORITHM)
    .update(textToHash)
    .digest(HASH_ENCODING);

  return `${salt}:${hash}`;
};

export const comparePassword = (password, storedPassword) => {
  if (!password || !storedPassword) return false;

  const [salt, storedHash] = storedPassword.split(':');

  if (!salt || !storedHash) return false;

  const pepper = getPepper();
  const textToHash = `${salt}${pepper}${password}`;
  const hash = crypto
    .createHash(HASH_ALGORITHM)
    .update(textToHash)
    .digest(HASH_ENCODING);

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
};

export const isHashedPassword = (password) => {
  if (!password) return false;
  const parts = password.split(':');
  return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
};
