"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Address } from "@/lib/generated/prisma";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const formSchema = z.object({
  name: z.string(),
  subdistrict: z.string(),
  city: z.string(),
  province: z.string(),
  phoneNumber: z.string(),
  zipCode: z.string(),
});

interface AddressFormProps {
  address?: Address | null;
}

export default function AddressForm({ address }: AddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [disableEdit, setDisableEdit] = useState(true);
  const router = useRouter();

  const toastMessage = address
    ? "Alamat Berhasil Diubah"
    : "Alamat Berhasil Ditambahkan";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: address || {
      name: "",
      city: "",
      subdistrict: "",
      province: "",
      phoneNumber: "",
      zipCode: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setDisableEdit(true)
      if (!address) {
        await axios.post("/api/address", values);
      } else {
        await axios.patch(`/api/address/${address.id}`, values);
      }

      toast.success(toastMessage);
    } catch (error: unknown) {
      toast.error("Aksi gagal!");
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={disableEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kota</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={disableEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subdistrict"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kecamatan</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={disableEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={disableEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Telp</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={disableEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Pos</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} disabled={disableEdit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-end">
          {disableEdit ? (
            <Button
              type="button"
              disabled={isLoading}
              className="min-w-[150px]"
              onClick={() => setDisableEdit(false)}
            >
              Edit <CiEdit />
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                type="button"
                disabled={isLoading}
                variant="outline"
                className="min-w-[100px]"
                onClick={() => setDisableEdit(true)}
              >
                Cancel <IoMdClose />
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="min-w-[150px]"
              >
                Simpan Perubahan <FaSave />
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
}
