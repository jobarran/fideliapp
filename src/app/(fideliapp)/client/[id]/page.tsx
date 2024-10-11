import { getCompanyByUser } from "@/actions";
import { ClientDashboard } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function CardsByIdPage({ params }: Props) {

  const { id } = params;

  const company = await getCompanyByUser(id);

  if (!company) {
    return <p>Company not found</p>;
  }

  return (
    <div>
      <ClientDashboard company={company} userId={id} />
    </div>
  );
}
