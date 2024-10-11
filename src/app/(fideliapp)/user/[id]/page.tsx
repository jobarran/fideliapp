import { getUserById } from "@/actions";
import Link from "next/link";
import { Card } from '@/interfaces';

interface Props {
  params: {
    id: string;
  };
}

export default async function CardsByIdPage({ params }: Props) {
  const { id } = params;

  const { user } = await getUserById(id)

  return (
    <div>
      <Link
        className="cursor-pointer"
        href={`/client/${id}`}>
        <p className="text-sm text-gray-900">Perfil Cliente</p>
      </Link>
      <p>{id}</p>
    </div>
  );
}
