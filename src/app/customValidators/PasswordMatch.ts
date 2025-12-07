import { AbstractControl , ValidationErrors } from "@angular/forms";

export function PasswordMatch(Control: AbstractControl): ValidationErrors | null {
    const password = Control.get('password')?.value;
    const confirmPassword = Control.get('re_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
}