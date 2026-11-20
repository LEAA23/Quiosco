import {create} from "zustand";
import { OrderItem } from "../types";
import { Product } from "../generated/prisma/client";
import { products } from "@/prisma/data/products";

type Store = {
    order: OrderItem[];
    addToOrder: ( product: Product ) => void;
    increaseQuantity: ( id: Product["id"] ) => void;
    decreaseQuantity: ( id: Product["id"] ) => void;
    removeItem: ( id: Product["id"] ) => void;
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: ( product ) => {
        const { categoryId, image, ...data } = product;
        let items : OrderItem[] = [];

        if( get().order.find(prevProduct => prevProduct.id === product.id) ) {

            items = get().order.map(item => item.id === product.id && item.quantity < 5? {
                
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * ( item.quantity + 1 )
                
            } : item);
        } else {
            items = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set((state) => ({
            order: items
        }))
    },
    increaseQuantity: ( id ) => {
        set(state => ({
            order: state.order.map(product => product.id === id? {
                ...product,
                quantity: product.quantity + 1,
                subtotal: product.price * ( product.quantity + 1 )
            } : product)
        }))
    },
    decreaseQuantity: ( id ) => {
        const items = get().order.map(product => {
            if(product.id === id) {
                return {
                    ...product,
                    quantity: product.quantity - 1,
                    subtotal: product.price * ( product.quantity - 1 )
                }
            } 
            return product;
        });
        
        set(state => ({
            order: items
        }))
    },
    removeItem: (id) => {
        set(state => ({
            order: get().order.filter(product => product.id !== id)
        }));
    }
}));