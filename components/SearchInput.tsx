"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  keyword: z.string(),
});

export default function SearchInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const query = {
      q: values.keyword,
    };

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  }

  const toggleSearch = () => setIsExpanded((prev) => !prev);

  return (
    <div className="relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex items-center">
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <FormField
                  control={form.control}
                  name="keyword"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Cari..."
                          {...field}
                          className="rounded-full md:min-w-[300px] bg-white border-gray-500 
                          py-4 max-sm:py-3 transition-all duration-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="lbrown"
            size="icon"
            className="rounded-full text-black ml-2 z-10 max-sm:text-xs"
            type="button"
            onClick={toggleSearch}
          >
            <FiSearch />
          </Button>
        </form>
      </Form>
    </div>
  );
}
