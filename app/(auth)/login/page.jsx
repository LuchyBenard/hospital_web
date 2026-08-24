import { LoginForm } from "@/components/auth/login-form";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Patient Portal Login",
  description: "Sign in to your confidential patient healthcare portal.",
};

export default function LoginPage() {
  return (
    <Card className="p-6 sm:p-8">
      <h1 className="text-xl font-bold text-fg mb-1">Patient Sign In</h1>
      <p className="text-xs text-mute mb-6">
        Enter your registered email and password to access medical records, test
        results, and appointments.
      </p>
      <LoginForm />
    </Card>
  );
}
