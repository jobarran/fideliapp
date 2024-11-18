import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getCompanyBySlug, getProductsByCompanyId, getUserCardForCompany } from "@/actions";
import { CompanyProfile, CreateNewCardButton, ViewCardButton } from "@/components";

interface Props {
  params: {
    slug: string;
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

export default async function CompanyBySlugPage({ params }: Props) {

  const { slug } = params;

  if (!slug) {
    redirect("/");
  }

  const company = await getCompanyBySlug(slug);
  const { card, userId } = await getUserCardForCompany(slug);

  if (!company) {
    redirect("/");
  }

  console.log(!!card)

  const products = await getProductsByCompanyId(company.id);

  return (
    <div>
      <CompanyProfile
        company={company}
        products={products}
        userCardForCompany={!!card}
        card={card}
      />
    </div>
  );
}