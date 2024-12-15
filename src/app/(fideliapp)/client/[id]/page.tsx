import { getCompanyByUser, getCompanyTransactionsByUser, getProductsByCompanyId } from "@/actions";
import { ClientProfile } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function ClientPage({ params }: Props) {

  const { id } = params;

  const company = await getCompanyByUser(id);
  const transactions = await getCompanyTransactionsByUser(id)
  
  if (!company) {
    return <p>Company not found</p>;
  }

  const products = await getProductsByCompanyId(company.id);

  // Ensure that products is always an array
  const companyProducts = products ?? []; // If products is null, default to an empty array

  return (
    <div>
      <ClientProfile
        company={company}
        userId={id}
        products={companyProducts}
        transactions={transactions}
      />
    </div>
  );
}
