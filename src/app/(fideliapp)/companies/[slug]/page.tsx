import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getCompanyBySlug, getCompanyReviewsByCompanyId, getProductsByCompanyId, getUserCardForCompany, getUserPin } from "@/actions";
import { CompanyProfile } from "@/components";

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    tab?: string; // Add searchParams to include query parameters
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const company = await getCompanyBySlug(slug);

  return {
    title: company?.name ?? "Company not found",
    description: company?.activityType.name ?? "",
  };
}

export default async function CompanyBySlugPage({ params, searchParams }: Props) {

  const { slug } = params;
  const { tab } = searchParams;
  if (!slug) {
    redirect("/");
  }

  const company = await getCompanyBySlug(slug);
  const { card, userId } = await getUserCardForCompany(slug);
  const userPin = await getUserPin(card?.id)

  if (!company) {
    redirect("/");
  }

  const products = await getProductsByCompanyId(company.id);
  const reviews = await getCompanyReviewsByCompanyId(company.id)

  const selectedTab = tab || "product"; // Default to "tarjetas" if no tab is provided

  return (
    <div>
      <CompanyProfile
        company={company}
        products={products}
        userCardForCompany={!!card}
        card={card}
        selectedTab={selectedTab}
        userPin={userPin.pin}
        userId={userId}
        reviews={reviews}
      />
    </div>
  );
}