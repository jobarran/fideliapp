import { getCompanyByUser, getCompanyTransactionsByCompany, getCompanyTransactionsByUser, getProductsByCompanyId } from "@/actions";
import { auth } from "@/auth.config";
import { ClientAdmin, ClientProfile } from "@/components";
import { CompanyTransaction } from "@/interfaces/transacrion.interface";
import { sortTransactionsByDate } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function ClientPage({ params }: Props) {

  const { id } = params;

  return redirect(`/client/${id}/dashboard`);

}
