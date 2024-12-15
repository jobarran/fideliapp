import { getCompanyByUser, getCompanyTransactionsByUser, getProductsByCompanyId } from "@/actions";
import { auth } from "@/auth.config";
import { ClientProfile } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function ClientPage({ params }: Props) {

  const { id } = params;

  const company = await getCompanyByUser(id);
  const transactions = await getCompanyTransactionsByUser(id)
  const session = await auth();
  const user = session?.user || null;

  if (!company) {
    return <p>Company not found</p>;
  }

  const products = await getProductsByCompanyId(company.id);

  // Ensure that products is always an array
  const companyProducts = products ?? []; // If products is null, default to an empty array

  if (user?.id !== id) {
    redirect("/"); 
  }

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
