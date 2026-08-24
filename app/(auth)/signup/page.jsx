import { SignupForm } from "@/components/auth/signup-form";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Register Patient Account",
  description: "Create your confidential patient healthcare portal account.",
};

export default function SignupPage() {
  return (
    <Card className="p-6 sm:p-8">
      <h1 className="text-xl font-bold text-fg mb-1">Patient Registration</h1>
      <p className="text-xs text-mute mb-6">
        Register for secure online access to your Providence Health medical records,
        lab results, and appointments.
      </p>
      <SignupForm />
    </Card>
  );
}
