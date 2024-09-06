// components/CreateCardButton.tsx

'use client'; // This directive tells Next.js that this is a client component

import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createNewCard } from "@/actions";

interface CreateCardButtonProps {
  slug: string;
}

export const CreateCardButton: React.FC<CreateCardButtonProps> = ({ slug }) => {
  const router = useRouter();

  const handleCreateCard = async () => {
    createNewCard(slug)
  };

  return (
    <button
      onClick={handleCreateCard}
      className="absolute bottom-4 right-4 bg-slate-700 text-white text-sm py-2 px-2 rounded-lg shadow hover:bg-slate-950"
    >
      <span className="block sm:hidden">
        <FaPlus />
      </span>
      <span className="hidden sm:block">
        Crear tarjeta
      </span>
    </button>
  );
};
