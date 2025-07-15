"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError: setFormError,
  } = useForm<FormData>({
    defaultValues: {
      email: "nk@gmail.com",
      password: "pass",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
      } else {
        setFormError("root", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
    } catch (err) {
      setFormError("root", {
        type: "manual",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign In
        </h2>

        {errors.root && (
          <p className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
            {errors.root.message}
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Demo: <span className="text-blue-600">nk@gmail.com</span> /{" "}
          <span className="text-blue-600">pass</span>
        </p>

        <button
          type="button"
          onClick={() => signIn("github")}
          className="w-full py-2 mt-2 cursor-pointer bg-gray-800 text-white rounded hover:bg-gray-900 transition"
        >
          Continue with GitHub
        </button>

        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full py-2 mt-2 cursor-pointer bg-gray-800 text-white rounded hover:bg-gray-900 transition"
        >
          Continue with Google
        </button>
      </div>
    </main>
  );
}
