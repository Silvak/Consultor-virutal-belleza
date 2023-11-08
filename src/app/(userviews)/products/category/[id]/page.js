"use client";
import { useEffect, useState } from "react";
import Carousel from "../../../../../components/Carousel";
import ProductsSection from "../../../../../components/ProductsSection";
import RecommendedProductsSection from "../../../../../components/RecommendedProductsSection";
import { getCategory } from "../../../../../services/category.services";
import { useQuery } from "@tanstack/react-query";
import ProductsSkeletons from "../../../../../components/ProductsSkeletons";
import ProductCard from "../../../../../components/card/ProductCard";

/**
 * The CategoryWithIdPage function retrieves category data based on the provided id and manages loading
 * state.
 */
const CategoryWithIdPage = ({ params }) => {
  const id = params.id;
  const { data, status } = useQuery({
    queryFn: () => getCategory(id),
    queryKey: ["category", id],
  });
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="max-w-[1200px] w-full m-auto py-16">
      <h1 className="text-2xl font-semibold mt-2">
        Productos de la categoría: {categoryData.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
        {status == "pending" && <ProductsSkeletons />}
        {status == "success" &&
          data?.data?.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>

      <section className="pt-8">
        <h2 className="text-2xl font-semibold pl-4 mb-4">
          Recomendado para ti
        </h2>
        <div className="flex justify-center w-full">
          <Carousel data={categoryData.products.slice(0, 5)} />
        </div>
      </section>

      <RecommendedProductsSection />
    </div>
  );
};

export default CategoryWithIdPage;
