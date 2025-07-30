"use client";

import heroImage from "@/public/images/toiletries.png";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaShippingFast } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { IconType } from "react-icons/lib";
import { TiArrowSortedDown } from "react-icons/ti";
import { BiSolidCategory } from "react-icons/bi";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RiLeafFill } from "react-icons/ri";

interface HeroProps {
  productsCount: number;
  categoriesCount: number;
}

const HeroInformation = ({
  title,
  description,
  icon: Icon,
}: {
  title: string | number;
  description: string;
  icon: IconType;
}) => {
  return (
    <div className="flex items-center gap-2 lg:min-w-[100px] min-w-[50px]">
      <Icon className="text-3xl max-lg:text-xl hover:translate-x-1.5 transition duration-200 max-lg:hidden" />
      <div className="flex flex-col items-start">
        <p className="tracking-tighter font-semibold text-2xl max-lg:text-lg flex items-center gap-1">
          <Icon className="hover:translate-x-0.5 transition duration-200 lg:hidden"/>
          {title}
        </p>
        <p className="text-sm max-lg:text-xs">{description}</p>
      </div>
    </div>
  );
};

export default function Hero({ productsCount, categoriesCount }: HeroProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      className={cn(
        "bg-linear-180 from-white to-darker-cream",
        !isMounted ? "pb-21 max-sm:pb-60 max-md:pb-30" : "pb-5"
      )}
    >
      <div className="container flex flex-col justify-center p-6 2xl:px-35 xl:px-20 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div
          className={cn(
            "flex lg:space-y-5 space-y-2 flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left",
            "transition ease-in-out duration-700",
            isMounted
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          )}
        >
          <div className="">
            <h1 className="text-4xl tracking-tight font-extrabold leading-none lg:text-6xl relative 
            w-fit max-lg:mx-auto">
              LAVIERE
              <div className="absolute max-lg:-top-7 max-lg:-right-8 -top-11 -right-13">
                <RiLeafFill className="text-light-brown" />
              </div>
            </h1>
          </div>
          <p className="tracking-tight lg:leading-8 max-w-[95%] max-lg:leading-snug lg:text-base font-light text-sm max-sm:text-xs text-gray-900">
            Laviere adalah toko yang siap memenuhi kebutuhan peralatan mandi
            mulai dari kebutuhan bayi hingga kebutuhan mandi dewasa
          </p>
          <div className="flex items-center max-lg:justify-center">
            <Link to="recommendation" smooth={true} duration={500}>
              <Button
                variant="lbrown"
                className="xl:min-w-[425px] lg:min-w-[370px] sm:min-w-[300px] lg:py-5.5 min-w-[200px] rounded-full 
              max-lg:text-xs font-bold flex items-center justify-center border border-black"
              >
                Lihat Produk
                <TiArrowSortedDown />
              </Button>
            </Link>
          </div>
          <div className="flex items-center max-lg:justify-center lg:gap-10 gap-4 max-lg:pb-5">
            <HeroInformation
              icon={FaShippingFast}
              title="100%"
              description="Gratis Ongkir"
            />
            <HeroInformation
              icon={AiFillProduct}
              title={productsCount}
              description="Total Produk"
            />
            <HeroInformation
              icon={BiSolidCategory}
              title={categoriesCount}
              description="Total Kategori"
            />
          </div>
        </div>
        <div
          className={cn(
            "flex items-center justify-center mt-2 lg:mt-0 lg:h-126 md:h-96 sm:h-80 h-60 relative rounded-full",
            "transition ease-in-out duration-700",
            isMounted
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          )}
        >
          <Image
            src={heroImage}
            alt=""
            className="object-contain w-full h-full hover:scale-103 transition duration-300 z-10 hover:opacity-90"
          />
          <div className="absolute bottom-15 translate-x-2">
            <div
              className="bg-gradient-to-t to-custom-white via-[#EBE5C2] from-darker-cream
              lg:h-110 md:h-90 sm:h-70 h-60 lg:w-110 md:w-90 sm:w-70 w-60 max-sm:translate-y-10 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
