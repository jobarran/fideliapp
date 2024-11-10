import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { checkUserCardForCompany, getCompanyBySlug, getProductsByCompanyId } from "@/actions";
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
  const { userCardForCompany, cardId, userId } = await checkUserCardForCompany(slug);

  if (!company) {
    redirect("/");
    return null;
  }

  const products = await getProductsByCompanyId(company.id);

  return (
    <div>
      <CompanyProfile
        company={company}
        products={products}
        actionButtons={
          userId !== null ? (
            <>
              <CreateNewCardButton
                show={userCardForCompany}
                slug={slug}
              />
              <ViewCardButton
                show={!userCardForCompany}
                cardId={cardId}
              />
            </>
          ) : null
        }
      />
    </div>
  );
}