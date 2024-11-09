import { getAllActivityType, getAllCardsByUser, getAllCompanies } from "@/actions";
import { CompanyCloserSlider, CompanyPopularSlider, HowItWorks, MapComponent, MapProvider, SearchCompanySmallScreen, UserCardSlider } from "@/components";
import { Card } from "@/interfaces";
import { companyLocationsMap, sortCards } from "@/utils";
import { auth } from "@/auth.config";

export default async function Home() {

  const session = await auth();

  const companies = await getAllCompanies()

  let myCompanyCards: Card[] = [];

  const cardsResult = await getAllCardsByUser();

  if (cardsResult.ok) {
    myCompanyCards = cardsResult.cards || [];
  } else {
    console.error(cardsResult.message);
  }

  const sortedCards = sortCards(myCompanyCards);
  // const companyLocs = await companyLocationsMap(companies);


  return (

    <main className="flex flex-col">

      <SearchCompanySmallScreen />

      {session?.user && <UserCardSlider userCards={sortedCards} />}

      <CompanyCloserSlider companiesAll={companies} />
      <CompanyPopularSlider companiesAll={companies} />


      {/* <MapProvider>
        <MapComponent companyLocation={companyLocs} />
      </MapProvider> */}

      <HowItWorks />

    </main>
  );
}
