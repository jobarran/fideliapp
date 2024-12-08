import { getUserById } from "@/actions";
import { UserProfile } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function UserPage({ params }: Props) {

  const { id } = params;

  // Get the user data
  const { user } = await getUserById(id);

  console.log(user)

  if (!user) {
    return <div>No user data available</div>; // Fallback for undefined case
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
