import { getCompanyByUser } from "@/actions";
import { auth } from "@/auth.config";
import { AddProductForm } from "@/components";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

export default async function ClientAdminProductNewPage({ params }: Props) {

    const { id } = params;
    const company = await getCompanyByUser(id);
    const session = await auth();
    const user = session?.user || null;

    if (!company) {
        redirect("/");
    }

    if (user?.id !== id) {
        redirect("/");
    }

    return (
        <AddProductForm companyId={company.id} userId={id} companyName={company.name} companyLogoUrl={company.CompanyLogo?.url} companyColor={company.backgroundColor} />
    );
}
