import { getAllActivityType, getAllCardsByUser, getAllCompanies } from "@/actions";
import { auth } from "@/auth.config";
import { CompaniesAll, CompanyCardsByUser, HowItWorks, MapComponent, MapProvider, SearchCompanySmallScreen } from "@/components";
import { Card } from "@/interfaces";
import { companyLocationsMap } from "@/utils";

export default async function Home() {
  const session = await auth();
  const user = session?.user || null;

  const [activities, companies] = await Promise.all([getAllActivityType(), getAllCompanies()]);

  let myCompanyCards: Card[] = [];

  if (user) {
    myCompanyCards = await getAllCardsByUser(user.id);
  }

  const companyLocs = await companyLocationsMap(companies);

  return (

    <main className="flex flex-col">

      <SearchCompanySmallScreen/>

      {user && myCompanyCards.length > 0 && <CompanyCardsByUser myCompanyCards={myCompanyCards} />}

      {/* {activities.length > 0 && <ActivityTypes activities={activities} />} */}

      {companies.length > 0 ? (
        <CompaniesAll companiesAll={companies} />
      ) : (
        <p>No hay negocios disponibles.</p>
      )}

      <MapProvider>
        <MapComponent companyLocation={companyLocs} />
      </MapProvider>
      
      <HowItWorks />

    </main>
  );
}
