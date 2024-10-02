import { auth } from "@/auth.config";
import { Footer, TopMenu } from "@/components";
import { redirect } from "next/navigation";

export default async function JobsiteLayout({ children }: {
  children: React.ReactNode;
}) {

  const session = await auth()
  const user = session?.user || null;

  if (session?.user) {
    redirect('/')
  }

  return (

    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <TopMenu user={user} />
        <div className="flex flex-col items-center justify-center">
          <div className="container px-4 py-4">
            <div className="max-w-4xl w-full mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}