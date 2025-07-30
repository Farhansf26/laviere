"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Category, Image } from "@/lib/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modals/AlertModal";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.array(z.object({ key: z.string(), url: z.string() })),
});

interface CategoryFormProps {
  data?: Category & {
    images: Image[]
  } | null;
}

export default function CategoryForm({ data }: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const title = data ? "Update Category" : "Create Category";
  const description = data
    ? "update or delete category"
    : "create a new category";
  const action = data ? "Save Changes" : "Submit";
  const toastMessage = data ? "Category updated" : "Category created";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      name: "",
      images: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setIsLoading(true);

      if (data) {
        await axios.patch(`/api/categories/${params?.categoryId}`, values);
      } else {
        await axios.post("/api/categories", values);
      }

      router.push("/admin/categories");
      toast.success(toastMessage);
    } catch (error: unknown) {
      toast.error("Failed to create/update category!");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/categories/${data?.id}`);
      router.push("/admin/categories");
      toast.success("Category deleted.");
    } catch (error: unknown) {
      toast.error("Failed to delete category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        disabled={isLoading}
        onDelete={handleDelete}
      />
      <div className="flex flex-col space-y-4">
        <div>
          <Heading title={title} description={description} />
        </div>
        <Separator />
        <div className="grid md:grid-cols-3 grid-cols-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                        onRemove={(key) =>
                          field.onChange([
                            ...field.value.filter((image) => image.key !== key),
                          ])
                        }
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="ex: Clothes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end space-x-4">
                {data && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setIsOpen(true)}
                  >
                    Delete
                    <Trash />
                  </Button>
                )}
                <Button type="submit" disabled={isLoading}>
                  {action}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
