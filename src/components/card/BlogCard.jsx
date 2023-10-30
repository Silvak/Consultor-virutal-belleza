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
import Link from "next/link";
import { AiOutlineHeart, AiOutlineStar } from "react-icons/ai";

export default function BlogCard({
  title,
  author,
  coverPhoto,
  slug,
  datePublishesd,
}) {
  return (
    <Card className="shadow-lg cursor-pointer hover:border-[#7E8EFF] select-none">
      <Link href={`/blog/article/${slug}`}>
        <div className="px-6 pt-6 w-full">
          <Image
            src={coverPhoto?.url}
            alt="Picture of the product"
            className="rounded-md max-w-full h-[240px] object-cover"
            width={500}
            height={500}
          />
        </div>

        <CardHeader className="flex justify-between">
          <div className="flex justify-between items-center gap-1 border-b pb-3">
            <CardTitle>{title}</CardTitle>
            <p>{author?.name}</p>
          </div>
          <div className="flex justify-between gap-2 pt-2">
            <div className="flex gap-2">
              <AiOutlineHeart className="text-[24px]" /> <p>1k</p>
            </div>

            <p className="text-sm">{datePublishesd}</p>
          </div>
        </CardHeader>
      </Link>
    </Card>
  );
}
