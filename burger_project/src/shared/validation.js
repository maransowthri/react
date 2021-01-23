export const validateRules = (value, rules) => {
  if (rules.required) {
    if (value.trim().length <= 0) {
      return false;
    }
  }

  if (rules.minLength) {
    if (value.trim().length < rules.minLength) {
      return false;
    }
  }

  if (rules.maxLength) {
    if (value.trim().length > rules.maxLength) {
      return false;
    }
  }

  if (rules.isEmail) {
    const re = /^[\w]{1,16}@[\w]{2,16}\.[\w]{3,5}$/;
    if (!re.test(String(value).toLowerCase())) {
      return false;
    }
  }

  return true;
};
