const ErrorMessages = (error) => {
  switch (error) {
    case "auth/invalid-email":
      return "Invalid email, please enter a valid email address.";
    case "auth/invalid-password":
      return "The provided password is invalid. It must contain at least six characters.";
    case "auth/wrong-password":
      return "The provided password is incorrect.";
    case "auth/weak-password":
      return "The provided password is too weak. It must contain at least six characters.";
    case "auth/email-already-exists":
      return "This email is already in use. Please use another email address to register, or sign in using your credentials.";
    case "auth/email-already-in-use":
      return "This email is already in use. Please register using a different email address, or sign in using your credentials.";
    case "auth/user-not-found":
      return "User not found. Please try other credentials.";
    case "auth/invalid-argument":
      return "We were unable to process your request. Please try other credentials.";
    case "auth/internal-error":
      return "Something went wrong! Please try again later.";
    case "both invalid":
      return "The provided email and password are both invalid. The email address must be in a valid format, and the password must contain at least six characters.";
    case "auth/too-many-requests":
      return "The server is experiencing too many requests. Please wait for a bit, then try again.";
    case "auth/session-cookie-expired":
      return "Your login has expired. Please login again.";
    case "auth/id-token-expired":
      return "Your login has expired. Please login again.";
    case "auth/id-token-revoked":
      return "Your login has expired. Please login again.";
    case "auth/invalid-id-token":
      return "Your login has expired. Please login again.";
    default:
      return "Something went wrong!";
  }
};

export default ErrorMessages;
