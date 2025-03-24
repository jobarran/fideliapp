import { getCompanyByUser, getCompanyTransactionsByCompany, getProductsByCompanyId } from "@/actions";
import { auth } from "@/auth.config";
import { ClientAdminDashboard } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function ClientPage({ params }: Props) {

  const { id } = params;

  const company = await getCompanyByUser(id);
  const session = await auth();
  const user = session?.user || null;

  if (!company) {
    redirect("/");
  }

  const products = await getProductsByCompanyId(company.id);
  const companyProducts = products ?? []; // If products is null, default to an empty array
  const transactions = await getCompanyTransactionsByCompany(company.id)
  const companyTransactions = transactions ?? []

  if (user?.id !== id) {
    redirect("/");
  }

  return (
    <div>
      <ClientAdminDashboard company={company} products={companyProducts} transactions={companyTransactions} />
    </div>
  );
}
