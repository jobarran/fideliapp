import { CreateCompanyForm } from './ui/CreateCompanyForm'
import { auth } from '@/auth.config';
import { getCompanyByUser } from '@/actions';
import { CompanyExist } from '@/components';

export default async function CreateCompanyPage() {

    const session = await auth();
    const user = session?.user || null;

    // Declare company as null to be used later
    let company = null;

    if (user) {
        // Await the result of the getCompanyByUser action
        company = await getCompanyByUser(user?.id);
    }

    return (
        <div>
            {company ? (
                <CompanyExist company={company} userId={user?.id} />
            ) : (
                <CreateCompanyForm user={user} />
            )}
        </div>
    )
}
