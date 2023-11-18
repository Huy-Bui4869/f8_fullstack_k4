const pattern =
  /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

export const checkRegexEmail = (email) => {
  return pattern.test(email);
};
