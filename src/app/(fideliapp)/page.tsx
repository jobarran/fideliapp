import { getAllActivityType, getAllCardsByUser, getAllCompanies, getAllRewards } from "@/actions";
import { ActivityTypeGrid, CompanyCloserSlider, HowItWorks, MapComponent, MapProvider, PopularRewardsSlider, SearchCompanySmallScreen, SliderHeader, UserCardSlider } from '@/components';
import { Card } from "@/interfaces";
import { companyLocationsMap, sortCards } from "@/utils";
import { auth } from "@/auth.config";

export default async function Home() {

  const session = await auth();

  const companies = await getAllCompanies()

  let myCompanyCards: Card[] = [];

  const cardsResult = await getAllCardsByUser();

  const rewards = await getAllRewards()

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

      <ActivityTypeGrid />

      <CompanyCloserSlider companiesAll={companies} />

      <PopularRewardsSlider popularRewards={rewards} />

      <SliderHeader label={'Recomendados'} href={'/'} seeAllLabel={'Ver todos'} />

      <SliderHeader label={'Nuevos'} href={'/'} seeAllLabel={'Ver todos'} />

      {/* <CompanyTopRatedSlider companiesAll={companies} /> */}


      {/* <MapProvider>
        <MapComponent companyLocation={companyLocs} />
      </MapProvider> */}

      <HowItWorks />

    </main>
  );
}
