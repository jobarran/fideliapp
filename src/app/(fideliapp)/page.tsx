import { getAllActivityType, getAllCardsByUser, getAllCompanies } from "@/actions";
import { auth } from "@/auth.config";
import { ActivityTypes, CompaniesAll, CompanyCardsByUser, HowItWorks, MapComponent, MapProvider } from "@/components";
import { Card } from "@/interfaces";

export default async function Home() {
  const session = await auth();
  const user = session?.user || null;

  // Fetch activities and companies in parallel to improve performance
  const [activities, companies] = await Promise.all([getAllActivityType(), getAllCompanies()]);

  let myCompanyCards: Card[] = [];

  // Fetch cards only if the user is logged in
  if (user) {
    myCompanyCards = await getAllCardsByUser(user.id);
  }

  return (
    <MapProvider>

      <main className="flex flex-col">
        {user && myCompanyCards.length > 0 && <CompanyCardsByUser myCompanyCards={myCompanyCards} />}

        {activities.length > 0 && <ActivityTypes activities={activities} />}

        {companies.length > 0 ? (
          <CompaniesAll companiesAll={companies} />
        ) : (
          <p>No hay negocios disponibles.</p>
        )}

       <MapComponent />      

        <HowItWorks />
      </main>
    </MapProvider>
  );
}
