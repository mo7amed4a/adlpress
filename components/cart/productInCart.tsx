"use client";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import AlertCart from "../cart/AlertCart";
import useDelete from "@/hooks/use-delete";
//import { Product } from "@/app/(pages)/products/[id]/page";
import SelectQuantity from "./SelectQuantity";

interface ProductProps {
  isFavorite: boolean;
  isChecked: boolean;
  product: {
    product: any;
    documentId: string;
    quantity: number;
  };
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  onCheckChange?: (isChecked: boolean) => void;
  toggleWishlist?: () => void;
  onQuantityChange?: (documentId: string, quantity: number) => void; // New prop
  onDelete?: (documentId: string) => void; // New prop to update parent state
}

const ProductInCart: React.FC<ProductProps> = ({
  isFavorite,
  setRefresh,
  isChecked,
  product,
  onCheckChange,
  toggleWishlist,
  onQuantityChange,
  onDelete,
}) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const { deleteData, loading: deleteLoading, error: deleteError, deleteRequest } = useDelete("/carts");

  // Handle delete button click
  const handleDelete = async () => {
    try {
      await deleteRequest([product.documentId]); // Send DELETE request for this product's documentId
      if (!deleteError && onDelete) {
        onDelete(product.documentId); // Notify parent to remove product
      }
      setIsOpenAlert(false);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="flex items-start p-4 space-x-4 rounded-lg border shadow-sm">
      <Checkbox
        checked={isChecked}
        onCheckedChange={onCheckChange}
        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <div className="flex flex-col gap-4 w-full md:flex-row">
        <Image
          src={product.product?.image?.url || "/placeholder.png"} // Fallback image
          width={200}
          height={200}
          alt={product?.product?.name || "Product"}
          className="w-full h-52 md:h-48 md:w-36"
        />
        <div className="flex items-start w-full">
          <div className="flex flex-col flex-1 space-y-3 md:h-40 md:justify-between md:space-y-2 lg:py-3">
            <h2 className="text-sm font-semibold lg:text-lg">{product?.product?.name}</h2>
            <p className="text-xs underline cursor-pointer md:text-sm text-primary">
              {product.product?.child_lasts?.[0]?.name || "No category"}
            </p>
            <SelectQuantity setRefresh={setRefresh} product={product} onQuantityChange={onQuantityChange} />
          </div>
          <div className="flex flex-col items-end text-lg font-semibold md:justify-between md:h-36 text-primary">
            <div className="flex">
              {/* <Button
                variant={"ghost"}
                onClick={toggleWishlist}
                className={`group ${isFavorite ? "text-red-500" : "text-gray-500"}`}
                size="icon"
                disabled={deleteLoading}
              >
                <Heart
                  className={`group-hover:fill-red-500 group-hover:stroke-red-500 ${
                    isFavorite ? "fill-red-500" : "stroke-gray-500"
                  }`}
                />
              </Button> */}
              <Button
                variant={"ghost"}
                className="text-red-500"
                size="icon"
                onClick={() => setIsOpenAlert(true)}
                disabled={deleteLoading}
              >
                <Trash2 />  
              </Button>
            </div>
            <div>
              {product?.product?.price}$
            </div>
          </div>
        </div>
      </div>
      <AlertCart
        isOpen={isOpenAlert}
        setIsOpen={setIsOpenAlert}
        msg={`Are you sure you want to delete ${product?.product?.name} from your cart?`}
        text="Delete Product"
        btnText="No, go back"
        btnText2="Yes, delete"
        action={handleDelete}
      />
    </div>
  );
};

export default ProductInCart;