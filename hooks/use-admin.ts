import authService from "@/lib/service/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function useAdmin() {
  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    const { email, password } = data;

    setLoading(true);
    try {
      const loginRes = await authService.login(email, password);
      const { token } = loginRes.data;

      await authService.token({ token });
      push("/admin");
    } catch (err: unknown) {
      toast.error(
        `❌ Login failed. Please check your credentials and try again. ${
          (err as Error).message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { cancel, request } = authService.me();
    request
      .then((res) => {
        console.log("✅ Auth check response:", res);
        if (res.data.authenticated) {
          console.log(
            "✅ User is authenticated, redirecting to admin dashboard"
          );
          push("/admin");
        }
      })
      .catch((err) => {
        console.error("❌ Auth check error:", err);
      });
    return () => cancel();
  }, []);

  return {
    handleSubmit,
    handleLogin,
    setLoading,
    loading,
    register,
  };
}
