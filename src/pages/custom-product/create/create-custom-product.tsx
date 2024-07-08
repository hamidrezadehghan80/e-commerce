import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MainHeader from "../../../components/layout/main-header";
import { Button } from "../../../components/ui/button";
import {
  CustomProductFormSchema,
  ICustomProductForm,
} from "../../../libs/validations/custom-product";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import Select from "../../../components/ui/select";
import { productHooks } from "../../../libs/endpoints/products/products-endpoints";
import { FileArrowUp, Trash } from "@phosphor-icons/react";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomProductContext from "../../../libs/contexts/custom-products/custom-product-context";
import { AppRoutes } from "../../../libs/routes";
import { toast } from "sonner";

export default function CreateCustomProduct() {
  const form = useForm<ICustomProductForm>({
    resolver: zodResolver(CustomProductFormSchema),
    defaultValues: {
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
      rate: "",
      rateCount: "",
    },
  });

  const { data: categories } = productHooks.useQueryCategories();
  const categoriesOptions =
    categories?.map((category) => ({
      value: category,
      label: category,
    })) || [];

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        form.setValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const customProductContext = useContext(CustomProductContext);
  if (!customProductContext)
    throw new Error(
      "CustomProductContext must be used within CustomProductProvider"
    );

  const { addProduct, getLastId } = customProductContext;

  const navigate = useNavigate();

  const onSubmit = ({
    title,
    description,
    category,
    image,
    price,
    rate,
    rateCount,
  }: ICustomProductForm) => {
    const lastProductId = getLastId();
    addProduct({
      id: lastProductId + 1,
      title,
      description,
      category,
      image,
      price: +price,
      rating: {
        rate: +rate,
        count: +rateCount,
      },
      isCustom: true,
    });
    navigate(AppRoutes.CustomProduct);
    toast.success("New product added successfully.");
  };

  return (
    <div className="h-full container flex flex-col gap-6 px-6">
      <MainHeader className="px-0" />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 my-6"
      >
        <div className="flex items-center gap-4 justify-between">
          <h2 className="font-semibold text-xl">Create Custom Product</h2>

          <Button variant={"default"} type="submit">
            Save
          </Button>
        </div>

        <div className="flex items-start gap-6">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 text-sm">
              <p>Title</p>
              <Input
                color={
                  form.formState.errors.title?.message ? "danger" : "default"
                }
                error={form.formState.errors.title?.message}
                {...form.register("title")}
              />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <p>Price($)</p>
              <Input
                color={
                  form.formState.errors.price?.message ? "danger" : "default"
                }
                error={form.formState.errors.price?.message}
                {...form.register("price")}
              />
            </div>

            <div className="flex flex-col gap-1 col-span-2 text-sm">
              <p>Description</p>
              <Textarea
                color={
                  form.formState.errors.description?.message
                    ? "danger"
                    : "default"
                }
                error={form.formState.errors.description?.message}
                {...form.register("description")}
              />
            </div>
            <div className="col-span-2 w-full grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1 text-sm">
                <p>Category</p>
                <Select
                  options={categoriesOptions}
                  placeholder="Select product category"
                  value={form.watch("category")}
                  onChange={(value) => form.setValue("category", value)}
                  color={
                    form.formState.errors.category?.message
                      ? "danger"
                      : "default"
                  }
                  error={form.formState.errors.category?.message}
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-1 text-sm">
                <p>Rate(0-5)</p>
                <Input
                  color={
                    form.formState.errors.rate?.message ? "danger" : "default"
                  }
                  error={form.formState.errors.rate?.message}
                  {...form.register("rate")}
                />
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <p>Number of users reviews</p>
                <Input
                  color={
                    form.formState.errors.rateCount?.message
                      ? "danger"
                      : "default"
                  }
                  error={form.formState.errors.rateCount?.message}
                  {...form.register("rateCount")}
                />
              </div>
            </div>
          </div>

          <div className="w-1/4 min-h-44 flex items-center justify-center text-center border rounded-md overflow-hidden">
            {form.watch("image") ? (
              <div className="w-full relative">
                <img
                  alt=""
                  src={form.watch("image")}
                  className="w-full h-auto"
                />
                <button
                  className="absolute top-2 end-2 hover:bg-neutral-50 p-2 rounded-md"
                  onClick={() => form.setValue("image", "")}
                >
                  <Trash size={22} />
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="flex flex-col items-center gap-2 text-neutral-500 text-sm"
                  onClick={() => inputRef.current?.click()}
                >
                  <FileArrowUp size={36} />

                  <p>Upload image</p>
                </button>
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
