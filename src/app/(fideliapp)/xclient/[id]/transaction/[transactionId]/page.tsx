import { getCompanyByUser, getProductsByCompanyId, getProductsById } from "@/actions";
import { ClientProfile } from "@/components";

interface Props {
    params: {
        transactionId: string;
    };
}

export default async function ClientTransactionPage({ params }: Props) {

    const { transactionId } = params;

    return (
        <div>
            <p>{transactionId}</p>
        </div>
    );
}
