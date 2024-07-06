import { useState } from "react";
import Modal from "../ui/modal";
import { IFilters, SortOptions } from "./products";
import Select, { ISelectOption } from "../ui/select";
import RangeSlider from "../ui/range-slider";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "@phosphor-icons/react";

export default function FiltersModal({
  onSubmit,
  onReset,
  categoryOptions,
  sortOptions,
  defaultFilters,
}: {

  onSubmit: (filters: IFilters) => void;
  onReset: () => void;
  categoryOptions: ISelectOption[];
  sortOptions: ISelectOption[];
  defaultFilters: IFilters;
}) {
  const [isFilterModalOpen, setFilterModalOpen] = useState<boolean>(false);

  const [filtersState, setFiltersState] = useState<IFilters>(defaultFilters);

  console.log(defaultFilters);
  

  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => setFilterModalOpen(true)}
        className="flex items-center gap-2"
      >
        <SlidersHorizontal size={24} />
        <p>Filter</p>
      </Button>
      <Modal
        title="Filter products"
        open={isFilterModalOpen}
        onOpenChange={setFilterModalOpen}
      >
        <div className="flex flex-col gap-4">
          <Select
            label="Sort"
            placeholder="Sort products"
            options={sortOptions}
            value={filtersState.sort}
            onChange={(sort) =>
              setFiltersState((prev) => ({
                ...prev,
                sort: sort as SortOptions,
              }))
            }
          />

          <Select
            label="Category"
            placeholder="Select Category"
            options={categoryOptions}
            value={filtersState.category}
            onChange={(category) =>
              setFiltersState((prev) => ({ ...prev, category }))
            }
          />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <p>Price range</p>
              <p className="px-2 py-1 rounded-full bg-sky-600 text-white text-sm">
                {`$${filtersState.priceRange.min} - $${filtersState.priceRange.max}`}
              </p>
            </div>

            <RangeSlider
            key={`${defaultFilters.priceRange.max} ${defaultFilters.priceRange.min}`}
              min={defaultFilters.priceRange.min}
              max={defaultFilters.priceRange.max}
              value={filtersState.priceRange}
              onValueChange={(priceRange) =>
                setFiltersState((prev) => ({ ...prev, priceRange }))
              }
              step={0.01}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <p>Rate range</p>
              <p>
                {`${filtersState.rateRange.min} - ${filtersState.rateRange.max}`}
              </p>
            </div>

            <RangeSlider
              key={`${defaultFilters.rateRange.max} ${defaultFilters.rateRange.min}`}
              min={defaultFilters.rateRange.min}
              max={defaultFilters.rateRange.max}
              value={filtersState.rateRange}
              onValueChange={(rateRange) =>
                setFiltersState((prev) => ({ ...prev, rateRange }))
              }
              step={0.1}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant={"outline"}
              onClick={() => {
                onReset();
                setFilterModalOpen(false);
              }}
            >
              Reset
            </Button>

            <Button
              onClick={() => {
                onSubmit(filtersState);
                setFilterModalOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
