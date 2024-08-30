import { useParams } from "react-router-dom"
import httpClient from "../utils/axiosClient"
import { useQuery } from "@tanstack/react-query";
import Product from "../types/Product";


export default function ProductDetails() {
    
    const { productId } = useParams(); 

    const { isPending, error, data } = useQuery({
        queryKey: [`product:${productId}`], queryFn: async () => {
            const result = await httpClient.get(`products/${productId}`);
            return result.data;
        },
    });

    const product = data as Product;
    
    if (isPending) {
        return <p>Loading...</p>
    }

    if (error) {
        console.log(error);
        return <p> an error occurred</p>
    }

    return <>
        
    </>
}