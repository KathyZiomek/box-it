const ErrorMessages = (error) => {
  if (error === "auth/invalid-email") {
    return "Invalid email, please enter a valid email address.";
  } else if (error === "auth/invalid-password") {
    return "The provided password is invalid. It must contain at least six characters.";
  } else if (error === "auth/wrong-password") {
    return "The provided password is incorrect.";
  } else if (error === "auth/weak-password") {
    return "The provided password is too weak. It must contain at least six characters.";
  } else if (error === "auth/email-already-exists") {
    return "This email is already in use. Please use another email address to register, or sign in using your credentials.";
  } else if (error === "auth/email-already-in-use") {
    return "This email is already in use. Please register using a different email address, or sign in using your credentials.";
  } else if (error === "auth/user-not-found") {
    return "User not found. Please try other credentials.";
  } else if (error === "auth/invalid-argument") {
    return "We were unable to process your request. Please try other credentials.";
  } else if (error === "auth/internal-error") {
    return "Something went wrong! Please try again later.";
  } else if (error === "both invalid") {
    return "The provided email and password are both invalid. The email address must be in a valid format, and the password must contain at least six characters.";
  } else {
    return "Something went wrong!";
  }
};

export default ErrorMessages;
