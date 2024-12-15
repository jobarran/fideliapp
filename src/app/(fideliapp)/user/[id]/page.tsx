import { getUserById } from "@/actions";
import { UserProfile } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: Props) {

  const { id } = params;

  // Get the user data
  const { user } = await getUserById(id);

  if (!user) {
    return <div>No user data available</div>; // Fallback for undefined case
  }

  if (user?.id !== id) {
    redirect("/");
  }

  const hasCompany = user.Company !== null; // true if Company exists

  return (
    <div>
      <div>
        <UserProfile user={user} userId={id} hasCompany={hasCompany} />
      </div>
    </div>
  );
}
