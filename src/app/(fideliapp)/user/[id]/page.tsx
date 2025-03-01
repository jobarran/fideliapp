import { getActivityTypes, getAllCompanies, getUserById } from "@/actions";
import { UserProfile } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    tab?: string;         // Add the `tab` parameter
    commentFilter?: string; // Add the `commentFilter` parameter
  };
}

export default async function UserPage({ params, searchParams }: Props) {

  const { id } = params;

  // Get the user data
  const { user } = await getUserById(id);
  const companies = await getAllCompanies()
  const activityTypes = await getActivityTypes();

  if (!user) {
    return <div>No user data available</div>; // Fallback for undefined case
  }

  if (user?.id !== id) {
    redirect("/");
  }

  const hasCompany = user.Company !== null; // true if Company exists
  const selectedTab = searchParams.tab || "tarjetas"; // Default to "tarjetas" if no tab is provided
  const tabFilter = searchParams.commentFilter; // Default to "tarjetas" if no tab is provided

  return (
    <div>
      <div>
        <UserProfile user={user} hasCompany={hasCompany} selectedTab={selectedTab} tabFilter={tabFilter} companies={companies} activityTypes={activityTypes} />
      </div>
    </div>
  );
}
