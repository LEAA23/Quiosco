"use client"

import { Product } from "@/src/generated/prisma/client"
import { useStore } from "@/src/store/store";

type AddProductButtonProps = {
    product: Product;
}

const AddProductButton = ( { product } : AddProductButtonProps ) => {

    const AddToOrder = useStore( state => state.addToOrder );

  return (
    <button
        type="button"
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        onClick={ () => AddToOrder( product ) }
    > 
        Agregar
    </button>
  )
}

export default AddProductButton