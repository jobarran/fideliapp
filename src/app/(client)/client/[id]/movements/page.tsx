import { getCompanyByUser, getCompanyTransactionsByCompany } from "@/actions";
import { auth } from "@/auth.config";
import { ClientAdminMovements } from "@/components";
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
    redirect("/");
  }

  const transactions = await getCompanyTransactionsByCompany(company.id)

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
