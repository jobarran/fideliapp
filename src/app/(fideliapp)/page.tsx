import { getAllActivityType, getAllCardsByUser, getAllCompanies } from "@/actions";
import { HowItWorks, MapComponent, MapProvider, SearchCompanySmallScreen, UserCardSlider } from "@/components";
import { Card } from "@/interfaces";
import { companyLocationsMap, sortCards } from "@/utils";
import { CompanySlider } from '../../components/ui/slider/CompanySlider';

export default async function Home() {


  const [activities, companies] = await Promise.all([getAllActivityType(), getAllCompanies()]);

  let myCompanyCards: Card[] = [];

  const cardsResult = await getAllCardsByUser();
  
  if (cardsResult.ok) {
    myCompanyCards = cardsResult.cards || [];
  } else {
    console.error(cardsResult.message); 
  }  

  const sortedCards = sortCards(myCompanyCards);

  const companyLocs = await companyLocationsMap(companies);

  return (

    <main className="flex flex-col">

      <SearchCompanySmallScreen/>

      {myCompanyCards.length > 0 && <UserCardSlider userCards={sortedCards} />}

      {companies.length > 0 ? (
        <CompanySlider companiesAll={companies} />
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
