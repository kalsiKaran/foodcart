import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required.")
    .min(3, "Full name must be at least 3 characters."),
  phone: Yup.string()
    .required("Phone number is required.")
    .matches(/^\d{10}$/, "Phone number must contain 10 digits."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character."
    ),
  c_password: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
