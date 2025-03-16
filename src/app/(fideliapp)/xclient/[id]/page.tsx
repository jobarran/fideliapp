import { getCompanyByUser, getCompanyTransactionsByCompany, getCompanyTransactionsByUser, getProductsByCompanyId } from "@/actions";
import { auth } from "@/auth.config";
import { ClientProfile } from "@/components";
import { CompanyTransaction } from "@/interfaces/transacrion.interface";
import { sortTransactionsByDate } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    tab?: string; 
  };
}

export default async function ClientPage({ params, searchParams }: Props) {

  const { id } = params;
  const { tab } = searchParams;

  const company = await getCompanyByUser(id);
  const session = await auth();
  const user = session?.user || null;

  const selectedTab = tab || "product"; // Default to "tarjetas" if no tab is provided


  if (!company) {
    return <p>Company not found</p>;
  }

  const transactions = await getCompanyTransactionsByCompany(company.id)
  const products = await getProductsByCompanyId(company.id);

  // Ensure that products is always an array
  const companyProducts = products ?? []; // If products is null, default to an empty array
  const companyTransactions = transactions ?? []

  const sortedTransactions = sortTransactionsByDate(companyTransactions);

  if (user?.id !== id) {
    redirect("/");
  }

  return (
    <div>
      <ClientProfile
        company={company}
        userId={id}
        products={companyProducts}
        transactions={sortedTransactions}
        selectedTab={selectedTab}
      />
    </div>
  );
}
