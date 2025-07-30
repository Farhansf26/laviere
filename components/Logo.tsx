"use client";

import Link from "next/link";
import { RiLeafFill } from "react-icons/ri";

export default function Logo() {
  return (
    <Link href="/" className="flex items-end relative">
      <h1 className="md:text-2xl text-xl font-extrabold tracking-tighter">
        LAVIERE
      </h1>
      <div className="absolute md:-top-2.5 md:-right-4.5 -top-2 -right-4">
        <RiLeafFill className="text-light-brown md:text-xl text-lg"/>
      </div>
    </Link>
  );
}
