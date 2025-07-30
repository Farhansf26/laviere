"use client";

import toothbrush from "@/public/images/toothbrush.jpg";
import toothpaste from "@/public/images/toothpaste.jpg";
import soap from "@/public/images/soap.jpg";
import shampoo from "@/public/images/shampoo.jpg";
import Image, { StaticImageData } from "next/image";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { BiSolidCategory } from "react-icons/bi";
import { useEffect, useState } from "react";

interface ICategoryList {
  label: string;
  image: StaticImageData;
  keyword: string;
}

const categoryList: ICategoryList[] = [
  {
    label: "Sikat Gigi",
    image: toothbrush,
    keyword: `sikat gigi`,
  },
  {
    label: "Pasta Gigi",
    image: toothpaste,
    keyword: `pasta gigi`,
  },
  {
    label: "Sabun",
    image: soap,
    keyword: `sabun mandi`,
  },
  {
    label: "Shampoo",
    image: shampoo,
    keyword: `shampoo`,
  },
];

export default function Categories() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const handleClick = (keyword: string) => {
    const query = {
      q: keyword,
    };

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="bg-darker-cream">
      <div className={cn(
        'lg:py-8 py-4 lg:rounded-t-[60px] space-y-4 bg-white',
        'transition-all duration-300',
        !isMounted ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      )}>
        <h1 className="lg:text-2xl text-xl font-extrabold uppercase flex items-center gap-1 justify-center">
          Kategori <BiSolidCategory className="-mt-[3px]"/>
        </h1>
        <div
          className="grid grid-cols-4 lg:grid-cols-3 gap-2 max-w-4xl mx-auto
                auto-rows-[100px] lg:auto-rows-[120px] px-3"
        >
          {categoryList.map((category, i) => {
            return (
              <div
                onClick={() => handleClick(category.keyword)}
                key={category.keyword}
                className={cn(
                  "flex items-center justify-center hover:scale-102",
                  "cursor-pointer overflow-hidden",
                  "relative w-full h-full hover:shadow-xl",
                  'transition-all duration-150 ease-in-out', 
                  !isMounted ? 'opacity-0' : 'opacity-100',

                  i === 0 &&
                    "lg:row-span-4 lg:col-span-1 lg:rounded-bl-xl lg:rounded-tl-4xl max-lg:rounded-xl",
                  i === 1 &&
                    "lg:row-span-2 lg:col-start-2 lg:col-span-2 lg:rounded-tr-4xl max-lg:rounded-xl",
                  i === 2 &&
                    "lg:row-span-2 lg:row-start-3 lg:col-start-2 max-lg:rounded-bl-lg max-lg:rounded-xl",
                  i === 3 &&
                    "lg:row-span-2 lg:row-start-3 lg:col-start-3 lg:rounded-br-4xl max-lg:rounded-xl",

                  i === 0 && "col-span-1",
                  i === 1 && "col-span-1",
                  i === 2 && "col-span-1",
                  i === 3 && "col-span-1",
                )}
              >
                <Image
                  src={category.image}
                  alt={`${category.label} category`}
                  fill
                  className="object-cover"
                />
                <p className="absolute font-bold lg:text-2xl md:text-xl text-lg tracking-tighter text-white">
                  {category.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
