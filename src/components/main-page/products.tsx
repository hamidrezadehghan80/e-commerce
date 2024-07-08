import { useMemo, useState } from "react";
import { productHooks } from "../../libs/endpoints/products/products-endpoints";
import ProductCard from "./product-card";
import FiltersModal from "./filters-modal";
import { Input } from "../ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import NotFoundCard from "../common/not-found-card";
import PageLoader from "../common/page-loader";

export type SortOptions =
  | "price-asc"
  | "price-desc"
  | "rate-asc"
  | "rate-desc"
  | "";
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
  const { data, isLoading, refetch } = productHooks.useQueryProducts();
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

  const filteredProducts = useMemo(() => {
    const sortedProducts = productsList.sort((productA, productB) => {
      if (filters.sort) {
        const sortType = filters.sort;

        if (sortType.startsWith("price")) {
          if (sortType === "price-asc") {
            return productA.price - productB.price;
          } else {
            return productB.price - productA.price;
          }
        }

        if (sortType.startsWith("rate")) {
          if (sortType === "rate-asc") {
            return productA.rating.rate - productB.rating.rate;
          } else {
            return productB.rating.rate - productA.rating.rate;
          }
        }
      }
      return 0;
    });

    const filteredProducts = sortedProducts.filter((product) => {
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      if (
        filters.search &&
        !product.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (
        product.price < filters.priceRange.min ||
        product.price > filters.priceRange.max
      ) {
        return false;
      }
      if (
        product.rating.rate < filters.rateRange.min ||
        product.rating.rate > filters.rateRange.max
      ) {
        return false;
      }
      return true;
    });

    return filteredProducts;
  }, [filters, productsList]);

  return (
    <div id="products" className="container w-full flex flex-col gap-8 my-10">
      <div className="flex items-center justify-between gap-4 relative">
        <div className="bg-white border border-neutral-200 rounded-md px-2  flex items-center gap-1">
          <MagnifyingGlass size={20} />
          <Input
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            placeholder="Search products..."
            className="w-fit min-w-60 bg-transparent border-0"
          />
        </div>

        <p className="text-3xl/7 absolute left-1/2 -translate-x-1/2 capitalize font-bold">
          Explore our products
        </p>

        <FiltersModal
          onSubmit={(newFilters) => setFilters(newFilters)}
          onReset={() => {
            setFilters(defaultFilters);
            refetch();
          }}
          categoryOptions={categoriesOptions}
          sortOptions={sortOptions}
          defaultFilters={defaultFilters}
          key={JSON.stringify(defaultFilters)}
        />
      </div>

      <PageLoader isLoading={isLoading}>
        <div className="grid grid-cols-5 gap-x-8 gap-y-12 items-stretch">
          {filteredProducts.length > 0 ? (
            <>
              {" "}
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </>
          ) : (
            <div className="flex col-span-5 items-center justify-center h-[300px]">
              <NotFoundCard title="No Products Found!" />
            </div>
          )}
        </div>
      </PageLoader>
    </div>
  );
}
