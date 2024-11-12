import { getCardById } from "@/actions";
import { CardProfile, UserCard } from "@/components";
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
      <CardProfile card={card} />
    </div>
  );
}
