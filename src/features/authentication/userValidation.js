export const emailValidation = (email) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const passwordValidation = (password) => {
  const mediumStrength = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})."
  );

  if (mediumStrength.test(password)) {
    return true;
  } else {
    return false;
  }
};
