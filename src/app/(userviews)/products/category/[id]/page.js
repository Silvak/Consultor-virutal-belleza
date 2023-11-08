"use client";
import { useEffect, useState } from "react";
import Carousel from "../../../../../components/Carousel";
import ProductsSection from "../../../../../components/ProductsSection";
import RecommendedProductsSection from "../../../../../components/RecommendedProductsSection";
import { getCategory } from "../../../../../services/category.services";

const CategoryWithIdPage = ({ params }) => {
  const id = params.id;

  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(id);

  useEffect(() => {
    if (id) {
      getCategory(id)
        .then((response) => {
          console.log(response);
          // Suponiendo que la respuesta tenga una estructura { data: { products: [...] } }
          setCategoryData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Hubo un error al obtener la categoría:", error);
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar un loader o mensaje de carga
  }

  if (!categoryData) {
    return <div>No se encontraron datos de la categoría.</div>;
  }

  return (
    <div className="max-w-[1200px] w-full m-auto py-16">
      <h1 className="text-2xl font-semibold mt-2">
        Productos de la categoría: {categoryData.name}
      </h1>
      {/* Renderizar los productos utilizando ProductsSection si es necesario */}
      <ProductsSection products={categoryData.products} />

      <section className="pt-8">
        <h2 className="text-2xl font-semibold pl-4 mb-4">
          Recomendado para ti
        </h2>
        <div className="flex justify-center w-full">
          {/* Pasar solo algunos productos al Carousel si quieres mostrar productos destacados */}
          <Carousel data={categoryData.products.slice(0, 5)} />
        </div>
      </section>

      <RecommendedProductsSection />
    </div>
  );
};

export default CategoryWithIdPage;
