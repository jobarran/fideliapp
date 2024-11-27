import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getCompanyBySlug, getProductsByCompanyId, getUserCardForCompany, getUserPin } from "@/actions";
import { CompanyProfile, CreateNewCardButton, ViewCardButton } from "@/components";

interface Props {
  params: {
    slug: string;
  };
  searchParams: {
    nav?: string; // Add searchParams to include query parameters
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
  const { nav } = searchParams;
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

  const initialTabIndex = nav === "product" ? 1 : 0;

  return (
    <div>
      <CompanyProfile
        company={company}
        products={products}
        userCardForCompany={!!card}
        card={card}
        initialTabIndex={initialTabIndex}
        userPin={userPin.pin}
        userId={userId}
      />
    </div>
  );
}