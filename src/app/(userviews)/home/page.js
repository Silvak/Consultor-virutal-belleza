"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.services";
import Image from "next/image";

//cn components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import JustifyContent from "@/components/JustifyContent";
import Carousel from "@/components/Carousel";
import BlogSection from "@/components/blog/BlogSection";

//table
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/card/ProductCard";
import CategoryCard from "@/components/card/CategoryCard";
import Link from "next/link";

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

//
/**
 * The above function is a React component that renders a page with various sections including a hero
 * section, categories, products, about section, blog section, and contact section.
 * @returns The `Page` component is returning a JSX element, which represents the structure and content
 * of the page.
 */
export default function Page() {
  const { toast } = useToast();

  const [pageNumber, setPageNumber] = useState(1);
  const onPageChange = (page) => setPageNumber(page);
  const limit = 6;
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
    <div className="flex flex-wrap">
      {/* hero */}
      <section className="flex items-center w-full h-[75vh] px-4">
        <JustifyContent width={1200}>
          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col justify-center w-full gap-4">
              <h1 className="text-5xl font-bold">Piensa.</h1>
              <h1 className="text-5xl font-bold">Siente.</h1>
              <h1 className="text-5xl font-bold">Vive.</h1>
              <p className="text-lg">Comienza la consultoría</p>
              <Button className="bg-[#7E8EFF] w-min text-2xl px-8 h-[46px]">
                Comenzar
              </Button>
            </div>
            <div className=" rounded-md">
              <Image
                src="/assets/face.jpg"
                className=" hidden md:flex w-full object-cover rounded-lg"
                width={500}
                height={500}
              />
            </div>
          </div>
        </JustifyContent>
      </section>

      {/* products */}
      <section className="w-full bg-gray-100 dark:bg-opacity-10 py-16 px-4">
        <JustifyContent width={1200}>
          <h3 className="text-2xl mb-6 font-semibold">Categortíras</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-3">
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>

          <h3 className="text-2xl mt-16 mb-6 font-semibold">Productos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {status == "success" &&
              productsData?.products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="flex justify-center w-full pt-8">
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
      </section>

      {/* about */}
      <JustifyContent width={1200}>
        <div className="flex flex-col w-full justify-center items-center text-center h-[400px] px-4">
          <h3 className="text-3xl mb-6 font-semibold text-center">Nosotros</h3>
          <p className="w-full md:w-[60%]">
            Lorem ipsum dolor sit amet consectetur. Id velit tellus id arcu quam
            tristique ipsum. Nisl at eget pretium sem proin porttitor semper.
            Tellus tristique sed fringilla phasellus et sed leo. Sem sit risus
            nec semper maecenas laoreet.
          </p>
        </div>
      </JustifyContent>

      {/* blog */}
      <section className="w-full bg-gray-100 dark:bg-opacity-10  py-16 px-4">
        <div className="flex justify-center w-full px-0 lg:px-8">
          <Carousel data={data || []} />
        </div>
        <JustifyContent width={1200}>
          <h3 className="text-2xl mt-16 mb-6 font-semibold">Blog</h3>
          <BlogSection />
          <Link href="/blog">
            <Button className="bg-[#7E8EFF] text-xl px-8 h-[46px] w-full mt-8 shadow-lg">
              Todas las entradas
            </Button>
          </Link>
        </JustifyContent>
      </section>
    </div>
  );
}
