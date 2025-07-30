"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Category, Product, Image, Age } from "@/lib/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useEffect, useState, WheelEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.array(z.object({ key: z.string(), url: z.string() })),
  price: z.coerce.number().min(1),
  ageId: z.string().min(1),
  stock: z.coerce.number().min(1),
  categories: z.string().array().min(1),
  description: z.string().min(1),
  isArchived: z.boolean().default(false).optional(),
});

interface ProductFormProps {
  data?:
    | (Product & {
        images: Image[];
      })
    | null;
  ages: Age[];
  categories: Category[];
}

export default function ProductForm({
  data,
  ages,
  categories,
}: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [ageOpen, setAgeOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const title = data ? "Update Product" : "Create Product";
  const description = data
    ? "update or delete product"
    : "create a new product";
  const action = data ? "Save Changes" : "Submit";
  const toastMessage = data ? "Product updated" : "Product created";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      name: "",
      images: [],
      ageId: "",
      stock: 0,
      categories: [],
      description: "",
      price: 0,
      isArchived: false,
    },
  });

  const priceValue = form.watch("price");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (priceValue.toString().includes("-"))
      return toast.error("Price must be a full of number!");
    try {
      setIsLoading(true);

      if (data) {
        await axios.patch(`/api/products/${params?.productId}`, values);
      } else {
        await axios.post("/api/products", values);
      }

      router.push("/admin/products");
      toast.success(toastMessage);
    } catch (error: unknown) {
      toast.error("Failed to update/create product.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectChange = (field: any, value: Category) => {
    if (field.value.find((item) => item === value.name)) {
      field.onChange([
        ...field.value.filter((item: any) => item !== value.name),
      ]);
    } else {
      field.onChange([...field.value, value.name]);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col space-y-3">
      <div>
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-2 md:col-span-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <Popover
                        open={categoryOpen}
                        onOpenChange={setCategoryOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="!bg-gray-100 font-light truncate"
                          >
                            {field.value.length < 1 ? (
                              <>Select Categories...</>
                            ) : (
                              <div className="flex space-x-1 items-center">
                                {field.value.map((category, i) => {
                                  return (
                                    <div key={category}>
                                      {category}
                                      {i < field.value.length - 1 && <>,</>}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <MdOutlineKeyboardDoubleArrowDown
                              size={20}
                              className={cn(
                                "transition duration-150 ml-auto",
                                categoryOpen ? "rotate-90" : ""
                              )}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-sm:w-[210px]">
                          <Command>
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {categories.map((category) => (
                                  <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={() =>
                                      handleSelectChange(field, category)
                                    }
                                    className="cursor-pointer"
                                  >
                                    {category.name}
                                    {field.value.find(
                                      (item) => item === category.name
                                    ) && <Check className="ml-auto" />}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Popover open={ageOpen} onOpenChange={setAgeOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="!bg-gray-100 truncate font-light"
                          >
                            <div className="font-light truncate">
                              {field.value ? (
                                <>
                                  {
                                    ages.find((age) => age.id === field.value)
                                      ?.name
                                  }
                                </>
                              ) : (
                                <p>Select age...</p>
                              )}
                            </div>
                            <MdOutlineKeyboardDoubleArrowDown
                              size={20}
                              className={cn(
                                "transition duration-150 ml-auto",
                                ageOpen ? "rotate-90" : ""
                              )}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 max-sm:w-[210px]">
                          <Command>
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              <CommandGroup>
                                {ages.map((age) => (
                                  <CommandItem
                                    key={age.id}
                                    value={age.id}
                                    onSelect={() => {
                                      field.onChange(age.id);
                                      setAgeOpen(false);
                                    }}
                                    className="cursor-pointer truncate"
                                  >
                                    {age.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          onWheel={(e: WheelEvent<HTMLInputElement>) =>
                            e.target.blur()
                          }
                          {...field}
                          className="[&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">Archived</FormLabel>
                      <FormDescription className="text-xs">
                        Not display product from anywhere
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell customer about your product"
                      className="resize-none max-md:text-sm"
                      {...field}
                      maxLength={500}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center md:justify-end">
              <Button
                type="submit"
                disabled={isLoading}
                className="md:w-[200px] w-full"
              >
                {action}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
