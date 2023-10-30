"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Search } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import ProductCard from "./card/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.services";
import ProductsSkeletons from "./ProductsSkeletons";
import Carousel from "./Carousel";

const data = [
  {
    title: "Tarjeta 1",
    description: "Descripción de la tarjeta 1",
    image: "/assets/productTest.webp",
  },
  {
    title: "Tarjeta 2",
    description: "Descripción de la tarjeta 1",
    image: "/assets/productTest.webp",
  },
  {
    title: "Tarjeta 3",
    description: "Descripción de la tarjeta 1",
    image: "/assets/productTest.webp",
  },
  {
    title: "Tarjeta 4",
    description: "Descripción de la tarjeta 1",
    image: "/assets/productTest.webp",
  },
  {
    title: "Tarjeta 5",
    description: "Descripción de la tarjeta 1",
    image: "/assets/productTest.webp",
  },
  {
    title: "Tarjeta 6",
    description: "Descripción de la tarjeta 1",
    image: "/assets/productTest.webp",
  },
  {
    title: "Tarjeta 7",
    description: "Descripción de la tarjeta 1",
    image: "/assets/productTest.webp",
  },
];

function ProductsSection() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const limit = 6;

  const { data: productsData, status } = useQuery({
    queryKey: ["products", limit, debouncedSearch],
    queryFn: () =>
      getProducts({
        limit,
        term: debouncedSearch,
      }),
  });

  return (
    <div className="my-8">
      <div className="flex items-center gap-2 w-full">
        <Input
          type="text"
          id="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="border-none focus-visible:ring-1 bg-gray-200 dark:bg-gray-200/20 h-[40px] outline-none pl-[40px]"
        />
        <Label htmlFor="search" className="absolute pl-2">
          <Search className="text-gray-400" />
        </Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        {status == "pending" && <ProductsSkeletons />}
        {status == "success" &&
          productsData?.products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default ProductsSection;
