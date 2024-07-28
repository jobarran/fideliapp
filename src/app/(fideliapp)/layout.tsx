import { TopMenu } from "@/components";
import { auth } from "@/auth.config";

export default async function BaseLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth()

    if (!session?.user ) {
        return null
    }

    return (

        <main>

            <TopMenu user={session.user}/>

            <div className="flex flex-col items-center justify-center">
                <div className="container px-4 py-4">
                    <div className="max-w-4xl w-full mx-auto">

                        {children}

                    </div>
                </div>
            </div>

        </main>

    );
}