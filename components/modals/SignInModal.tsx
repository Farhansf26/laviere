"use client";

import { useSignInModal } from "@/hooks/useSignInModal";
import Modal from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSignUpModal } from "@/hooks/useSignUpModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export default function SignInModal() {
  const [isLoading, setIsLoading] = useState(false);
  const signInModal = useSignInModal();
  const signUpModal = useSignUpModal()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    try {
      setIsLoading(true);
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Berhasil Login");
        router.refresh();
        signInModal.onClose();
      }
      if (response?.error) {
        throw new Error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const toggle = () => {
    signInModal.onClose()
    signUpModal.onOpen()
  }

  return (
    <Modal
      isOpen={signInModal.isOpen}
      onClose={signInModal.onClose}
      title="Sign In"
      description="Sign in to your account"
    >
      <div className="flex flex-col space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full py-5" disabled={isLoading}>
              Continue
            </Button>
          </form>
        </Form>

        <Separator />
        <div className="space-y-3">
          <Button
            className="w-full py-5"
            variant="outline"
            type="button"
            onClick={() => signIn("google")}
            disabled={isLoading}
          >
            Continue with Google
            <FcGoogle />
          </Button>
          <div className="flex items-center justify-center text-sm">
            <p className="text-muted-foreground font-light">
              Does not have an account?
            </p>
            <span className="ml-1 text-indigo-900 hover:underline cursor-pointer" onClick={toggle}>
              Sign Up
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
