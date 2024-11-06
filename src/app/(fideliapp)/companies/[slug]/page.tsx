import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { checkUserCardForCompany, createNewCard, getCompanyBySlug } from "@/actions";
import { CreateNewCardButton, MainHeader, ViewCardButton } from "@/components";

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
    title: company?.name ?? "Producto no encontrado",
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

  return (
    <div>
      <MainHeader
        headerClass={userCardForCompany ? "border-green-500" : "border-slate-200"}
        backgroundColor={company.backgroundColor}
        img={company.CompanyLogo?.url}
        title={company.name}
        subtitle={company.activityType.name}
        checked={userCardForCompany}
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