import { getCompanyByUser, getProductsByCompanyId } from "@/actions";
import { auth } from "@/auth.config";
import { ClientAdminTransaction } from "@/components";
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

  const products = await getProductsByCompanyId(company.id);

  // Ensure that products is always an array
  const companyProducts = products?.filter(product => product.active) ?? []; // If products is null, default to an empty array

  if (user?.id !== id) {
    redirect("/");
  }

  return (
    <div>
      <ClientAdminTransaction products={companyProducts} companySlug={company.slug} companyActive={company.active} />
    </div>
  );
}
