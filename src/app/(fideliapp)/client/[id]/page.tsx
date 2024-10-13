import { getCompanyByUser } from "@/actions";
import { ClientProfile } from "@/components";

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
      <ClientProfile company={company} userId={id} />
    </div>
  );
}
