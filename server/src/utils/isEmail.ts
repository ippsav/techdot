export const isEmail = (email: string): Boolean => {
  const sym = ["@", "."];
  for (let i = 0; i < 2; ++i) {
    if (!email.includes(sym[i])) {
      return false;
    }
  }
  if (email.indexOf(sym[0]) > email.indexOf(sym[1])) {
    return false;
  }
  const [_, p2] = email.split(".");
  if (p2.length > 3) {
    return false;
  }
  return true;
};
