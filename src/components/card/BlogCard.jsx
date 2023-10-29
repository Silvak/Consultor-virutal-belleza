"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";

export default function BlogCard({ article }) {
  return (
    <Card className="shadow-lg cursor-pointer hover:border-[#7E8EFF] select-none">
      <div className="px-6 pt-6 w-full">
        <Image
          src={"" || "/assets/palceholder.png"}
          alt="Picture of the product"
          className="rounded-md max-w-full h-[300px] object-cover"
          width={500}
          height={500}
        />
      </div>

      <CardHeader className="flex justify-between">
        <div className="flex flex-col gap-1 border-b pb-3">
          <CardTitle>{article?.name || "Blog title"}</CardTitle>
        </div>
        <div className="flex gap-2 pt-2">
          <AiOutlineHeart className="text-[24px]" /> <p>1k</p>
        </div>
      </CardHeader>
    </Card>
  );
}
