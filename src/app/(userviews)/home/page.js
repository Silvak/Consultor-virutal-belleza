"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.services";
import Image from "next/image";

//cn components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import JustifyContent from "@/components/JustifyContent";

//table
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/card/ProductCard";
import CategoryCard from "@/components/card/CategoryCard";

//specialist
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

  //console.log(productsData);

  return (
    <div className="flex flex-wrap">
      <article className="flex items-center w-full h-[75vh]">
        <JustifyContent>
          <div className="grid grid-cols-2">
            <div className="flex flex-col justify-center w-full gap-4">
              <h1 className="text-5xl font-bold">Piensa.</h1>
              <h1 className="text-5xl font-bold">Siente.</h1>
              <h1 className="text-5xl font-bold">Vive.</h1>
              <p className="text-lg">Comienza la consultoría</p>
              <Button className="bg-[#7E8EFF] w-min text-2xl px-8 h-[46px]">
                Comenzar
              </Button>
            </div>
            <div className="bg-gray-200 rounded-md">
              <Image
                src="/assets/face.jpg"
                className="w-full object-cover rounded-lg"
                width={500}
                height={500}
              />
            </div>
          </div>
        </JustifyContent>
      </article>

      <article className="w-full bg-gray-100">
        <JustifyContent className="w-[1200px]">
          <h3 className="text-2xl mb-6 font-semibold">Categortíras</h3>
          <div className="flex w-full justify-between">
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
          <div className="grid grid-cols-3 gap-8">
            {status == "success" &&
              productsData?.products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

            <div className="col-span-3">
              {status == "success" && (
                <Pagination
                  currentPage={pageNumber}
                  siblingCount={1}
                  totalPageCount={productsData?.paginating.totalpages}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </div>
        </JustifyContent>
      </article>

      <article className="w-full py-16">
        <JustifyContent className="">
          <h3 className="text-2xl mb-6 font-semibold text-center">Nosotros</h3>
          <div className="flex w-full justify-between text-center px-20">
            <p>
              Lorem ipsum dolor sit amet consectetur. Id velit tellus id arcu
              quam tristique ipsum. Nisl at eget pretium sem proin porttitor
              semper. Tellus tristique sed fringilla phasellus et sed leo. Sem
              sit risus nec semper maecenas laoreet.
            </p>
          </div>
        </JustifyContent>
      </article>

      <article className="w-full bg-gray-100">
        <JustifyContent className="w-[1200px]">
          <h3 className="text-2xl mt-16 mb-6 font-semibold">Productos</h3>
          <div className="grid grid-cols-3 gap-8">
            {status == "success" &&
              productsData?.products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

            <div className="col-span-3">
              {status == "success" && (
                <Pagination
                  currentPage={pageNumber}
                  siblingCount={1}
                  totalPageCount={productsData?.paginating.totalpages}
                  onPageChange={onPageChange}
                />
              )}
            </div>
          </div>
        </JustifyContent>
      </article>
    </div>
  );
}

/*

<div className="w-[120px]">
            <p>lorem</p>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  description: "Your message has been sent.",
                });
              }}
            >
              Show Toast
            </Button>
          </div>
*/
