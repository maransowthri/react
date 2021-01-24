export const validateRules = (value, rules) => {
  if (rules.required && value.trim().length <= 0) {
    return false;
  }
  if (rules.minLength && rules.minLength > value.trim().length) {
    return false;
  }
  if (rules.maxLength && rules.maxLength < value.trim().length) {
    return false;
  }
  return true;
};
