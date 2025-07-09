"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAdmin from "@/hooks/use-admin";

export default function LoginPage() {
  const { register, handleSubmit, handleLogin, loading } = useAdmin();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <Label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <Label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-yellow-400 text-white font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
