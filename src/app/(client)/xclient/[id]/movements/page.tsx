import { getCompanyByUser, getCompanyTransactionsByCompany, getProductsByCompanyId } from "@/actions";
import { auth } from "@/auth.config";
import { ClientAdminMovements, ClientAdminTransaction } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function ClientAdminTransactionPage({ params }: Props) {

  const { id } = params;

  const company = await getCompanyByUser(id);
  const session = await auth();
  const user = session?.user || null;

  if (!company) {
    return <p>Company not found</p>;
  }

  const transactions = await getCompanyTransactionsByCompany(company.id)
  const products = await getProductsByCompanyId(company.id);

  // Ensure that products is always an array
  const companyProducts = products ?? []; // If products is null, default to an empty array
  const companyTransactions = transactions ?? []

  if (user?.id !== id) {
    redirect("/");
  }

  return (
    <div>
      <ClientAdminMovements transactions={companyTransactions} userId={user.id} />
    </div>
  );
}
