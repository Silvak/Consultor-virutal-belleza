"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.services";
import Link from "next/link";
import Image from "next/image";

//components
import JustifyContent from "@/components/JustifyContent";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/card/ProductCard";
import Pagination from "@/components/Pagination";
import UserInfo from "@/components/UserInfo";

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

/**
 * The function exports a React component that renders a page with user information, recommended
 * products, specialist recommendations, and a history section.
 * @returns The `Page` component is returning a JSX structure that represents the layout and content of
 * a web page. It includes various elements such as headings, a carousel, product cards, pagination,
 * and a history section. The content of some elements is conditionally rendered based on the `status`
 * and `productsData` variables.
 */
export default function Page() {
  const [pageNumber, setPageNumber] = useState(1);
  const onPageChange = (page) => setPageNumber(page);
  const limit = 3;
  const offset =
    (pageNumber - 1) * limit > 0 ? (pageNumber - 1) * limit : undefined;

  const { data: productsData, status } = useQuery({
    queryKey: ["products", limit, offset],
    queryFn: () =>
      getProducts({
        limit,
        offset,
      }),
  });

  return (
    <div className="flex flex-col justify-center bg-gray-100 dark:bg-gray-100/10 py-16 px-4 lg:px-0">
      <JustifyContent width={1200}>
        <UserInfo />
      </JustifyContent>

      <JustifyContent width={1212}>
        <h3 className="text-2xl mt-16 mb-6 font-semibold ml-4">Para tí</h3>
        <Carousel data={data || []} />
      </JustifyContent>

      <JustifyContent width={1200}>
        <h3 className="text-2xl mt-16 mb-6 font-semibold">
          Recomendaciones de especialistas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {status == "success" &&
            productsData?.products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
        <div className="hidden justify-center w-full pt-8">
          {status == "success" && (
            <Pagination
              currentPage={pageNumber}
              siblingCount={1}
              totalPageCount={productsData?.paginating.totalpages}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </JustifyContent>

      <JustifyContent width={1200}>
        <h3 className="text-2xl mt-16 mb-6 font-semibold">Historial</h3>
        <div className="flex items-center justify-center w-full h-32 bg-white dark:bg-[#020817] shadow-lg rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-500/70">
            No hay historial relacionado
          </p>
        </div>
      </JustifyContent>
    </div>
  );
}
