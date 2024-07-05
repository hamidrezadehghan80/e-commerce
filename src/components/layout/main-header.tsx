import { ShoppingBagOpen } from "@phosphor-icons/react";
import { cn } from "../../libs/utils";

export default function MainHeader({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-between py-6 px-12", className)}
    >
      <div className="flex items-center gap-1">
        <img alt="E-Commerce" src="/image/logo.png" width={32} height={32} />
        <h1 className="text-xl font-semibold">B Commerce</h1>
      </div>

      <button>
        <ShoppingBagOpen width={32} height={32} />
      </button>
    </div>
  );
}
