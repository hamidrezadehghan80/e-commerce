export default function ProductCard() {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      <img
        alt=""
        src="/image/product.png"
        width={"100%"}
        height={"100%"}
        className="border border-neutral-200"
      />
      <div className="flex flex-col items-start gap-1">
        <p className="text-neutral-500">Women's Clothing</p>
        <p className="font-semibold">Women Cotton Jacket</p>

        <p>$ 12.25</p>
      </div>
    </div>
  );
}
