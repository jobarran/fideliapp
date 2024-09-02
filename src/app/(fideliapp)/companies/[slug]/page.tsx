import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { getCompanyBySlug } from "@/actions";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const company = await getCompanyBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: company?.name ?? "Producto no encontrado",
    description: company?.activityType.name ?? "",
  };
}

export default async function CompanyBySlugPage({ params }: Props) {
  console.log(params);

  const { slug } = params;

  if (!slug) {
    redirect("/");
    return null; // Ensure the component doesn't attempt to render
  }

  const company = await getCompanyBySlug(slug);

  if (!company) {
    redirect("/"); // Redirect if no company is found
    return null;
  }

  return (
    <div>
      <p>{company.name}</p>
      <p>{company.activityType.name}</p>
      {/* Add more company details here as needed */}
    </div>
  );
}
