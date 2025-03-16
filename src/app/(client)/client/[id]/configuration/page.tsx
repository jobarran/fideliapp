import { getCompanyByUser } from "@/actions";
import { auth } from "@/auth.config";
import { ClientAdminConfiguration } from "@/components";
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

  if (user?.id !== id) {
    redirect("/");
  }

  return (
    <div>
      <ClientAdminConfiguration
        company={company}
      />
    </div>
  );
}
