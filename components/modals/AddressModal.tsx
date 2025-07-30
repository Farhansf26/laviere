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
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSave } from "react-icons/fa";
import Modal from "../ui/modal";
import { useAddressModal } from "@/hooks/useAddressModal";

const formSchema = z.object({
  name: z.string().min(1),
  subdistrict: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  phoneNumber: z.string().min(1),
  zipCode: z.string().min(1),
});

export default function AddressModal() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const addressModal = useAddressModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    console.log(values);
    try {
      setIsLoading(true);
      await axios.post("/api/address", values);

      toast.success('Alamat Berhasil Ditambahkan');
      addressModal.onClose()
      router.refresh()
    } catch (error: unknown) {
      toast.error("Aksi gagal!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={addressModal.isOpen}
      onClose={addressModal.onClose}
      title="Mohon Isi Alamat Terlebih Dahulu"
      description="Masukkan alamat anda sebagai tujuan pengiriman!"
    >
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
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[150px]"
            >
              Simpan <FaSave />
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
