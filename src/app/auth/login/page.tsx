import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {

  return (
    <main className="flex items-center justify-center py-6">
      <div className="w-full bg-white rounded-lg border p-6">
        <LoginForm />
      </div>
    </main>
  );
}