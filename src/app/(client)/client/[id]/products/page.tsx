import { getCompanyByUser, getProductsByCompanyId } from "@/actions";
import { auth } from "@/auth.config";
import { ClientAdminProducts } from "@/components";
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

  const products = await getProductsByCompanyId(company.id);

  // Ensure that products is always an array
  const companyProducts = products ?? []; // If products is null, default to an empty array

  if (user?.id !== id) {
    redirect("/");
  }

  return (
    <div>
      <ClientAdminProducts userId={user.id} companyId={company.id} products={companyProducts} />
    </div>
  );
}
