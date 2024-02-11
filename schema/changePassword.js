import * as Yup from "yup";

export const changePasswordSchema = Yup.object({
    new_password: Yup.string()
    .required("New password is required.")
    .min(8, "New password must be at least 8 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      "New password must contain at least one uppercase, one lowercase, one number, and one special character."
    ),
  confirmNewPassword: Yup.string()
    .required("Confirm new password is required.")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match."),
});
