import bcrypt from 'bcrypt';

const SALT_ROUNDS: number = 10;

/**
  Hashed the password
  @Param {String} password
  @Returns {Promise<string>} hashed password
*/
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

/**
  Compare password and hashed password
  @Param {String} password
  @Param {String} hashedPassword
  @Returns {Promise<boolean>}
*/
const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export { comparePassword, hashPassword };
