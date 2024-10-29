import { getCompanyByUser, getProductsByCompanyId, getProductsById } from "@/actions";
import { ClientProfile } from "@/components";

interface Props {
    params: {
        productId: string;
    };
}

export default async function ClientProductPage({ params }: Props) {

    const { productId } = params;

    const product = await getProductsById(productId);

    return (
        <div>
            {product
                ? <p>{product.name}</p>
                : <p>No product</p>
            }
        </div>
    );
}
