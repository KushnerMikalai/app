import * as bcrypt from "bcrypt";

const encript = async (password: string) => {
  return await bcrypt.hash(password);
};

const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { compare, encript };
