import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../libs/query-client";
import CartProvider from "../libs/contexts/cart/cart-provider";
import CustomProductsProvider from "../libs/contexts/custom-products/custom-product-provider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <CustomProductsProvider>
          <Toaster
            theme={"light"}
            closeButton
            toastOptions={{
              style: {
                border: "border 1px solid #e3e6e8ff",
              },
            }}
            position={"top-right"}
            dir="ltr"
            richColors
          />
          {children}
        </CustomProductsProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
