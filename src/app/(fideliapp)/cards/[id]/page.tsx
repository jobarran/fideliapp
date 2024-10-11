import { getCardById } from "@/actions";
import { UserCard } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function CardsByIdPage({ params }: Props) {
  const { id } = params;

  const { card } = await getCardById(id);

  if (!card) {
    redirect("/");
  }

  return (
    <div>
      <UserCard key={card.id} card={card} />
    </div>
  );
}
