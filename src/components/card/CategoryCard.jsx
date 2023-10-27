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

export default function CategoryCard({ Category }) {
  return (
    <Card className="flex flex-col justify-center items-center gap-2 shadow-lg cursor-pointer hover:border-[#7E8EFF] w-[132px] h-[132px] p-6">
      <div className="">
        <Image
          src={"/assets/vECTOR.PNG" || "/assets/palceholder.png"}
          alt="Picture of the product"
          className="rounded-md  object-cover"
          width={48}
          height={48}
        />
      </div>

      <CardHeader className="flex flex-row  justify-center py-0">
        <h3 className="font-semibold">Makeup</h3>
      </CardHeader>
    </Card>
  );
}
