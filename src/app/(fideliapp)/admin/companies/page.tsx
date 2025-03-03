import { getAllAdminCompanies, getAllCompanies } from "@/actions";
import { CompaniesTable } from "@/components";
import { auth } from "@/auth.config";

export default async function AdminCompaniesPage() {

    const session = await auth();
    const companies = await getAllAdminCompanies();

    const adminId = session?.user.id

    if (!companies || companies.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <p className="text-gray-600 text-center mt-10">
                    No companies found. Please add some companies to manage.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <div className="mb-10">
                    <CompaniesTable companies={companies} />
                </div>
            </div>
        </div>
    );
}
