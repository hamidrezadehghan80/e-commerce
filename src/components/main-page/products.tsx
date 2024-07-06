import { useMemo, useState } from "react";
import { productHooks } from "../../libs/endpoints/products/products-endpoints";
import ProductCard from "./product-card";
import FiltersModal from "./filters-modal";

export type SortOptions = "price-asc" | "price-desc" | "rate-asc" | "rate-desc" | "";
export interface IFilters {
  category: string;
  sort: SortOptions;
  priceRange: {
    min: number;
    max: number;
  };
  rateRange: {
    min: number;
    max: number;
  };
  search: string;
}

export default function Products() {
  const { data } = productHooks.useQueryProducts();
  const productsList = data || [];

  const { data: categories } = productHooks.useQueryCategories();
  const categoriesOptions =
    categories?.map((category) => ({
      value: category,
      label: category,
    })) || [];

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rate-asc", label: "Rating: Low to High" },
    { value: "rate-desc", label: "Rating: High to Low" },
  ];

  const { minPrice, maxPrice, minRate, maxRate } = useMemo(() => {
    if (productsList.length === 0) {
      return {
        minPrice: 0,
        maxPrice: 100000,
        minRate: 0,
        maxRate: 5,
      };
    }

    return productsList.reduce(
      (acc, product) => ({
        minPrice: Math.min(acc.minPrice, product.price),
        maxPrice: Math.max(acc.maxPrice, product.price),
        minRate: Math.min(acc.minRate, product.rating.rate),
        maxRate: Math.max(acc.maxRate, product.rating.rate),
      }),
      {
        minPrice: Infinity,
        maxPrice: -Infinity,
        minRate: Infinity,
        maxRate: -Infinity,
      }
    );
  }, [productsList]);

  const defaultFilters: IFilters = {
    category: "",
    sort: "",
    priceRange: {
      min: minPrice,
      max: maxPrice,
    },
    rateRange: {
      min: minRate,
      max: maxRate,
    },
    search: "",
  };

  const [filters, setFilters] = useState<IFilters>(defaultFilters);

  return (
    <div className="container w-full flex flex-col gap-8 mt-10">
      <div className="flex items-center justify-between gap-4">
        {/* <Select
          value={sort}
          onChange={(newValue) => setSort(newValue as SortOptions)}
          options={sortOptions}
          placeholder="Sort products"
        /> */}

        <p className="text-3xl/7 self-center capitalize font-bold">
          Explore our products
        </p>

        <FiltersModal
          onSubmit={(newFilters) => setFilters(newFilters)}
          onReset={() => setFilters(defaultFilters)}
          categoryOptions={categoriesOptions}
          sortOptions={sortOptions}
          defaultFilters={defaultFilters}
        />
      </div>

      <div className="grid grid-cols-5 gap-x-8 gap-y-12 items-stretch">
        {productsList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
