import * as bcrypt from 'bcryptjs';

export const comparePasword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);

export const hashPassword = (password: string) => {
  const saltRound = Number(process.env.SALT_ROUND);
  const salt = bcrypt.genSaltSync(saltRound);
  return bcrypt.hashSync(password, salt);
};
