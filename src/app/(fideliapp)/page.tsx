import { getAllCardsByUser, getAllCompanies, getAllRewards } from "@/actions";
import { ActivityTypeGrid, CompanyCloserSlider, HowItWorks, PopularRewardsSlider, SearchCompanySmallScreen, SliderHeader, UserCardSlider } from '@/components';
import { Card, UserCard } from "@/interfaces";
import { sortCards } from "@/utils";
import { auth } from "@/auth.config";

export default async function Home() {

  const session = await auth();
  const companies = await getAllCompanies()
  let myCompanyCards: UserCard[] = [];
  const cardsResult = await getAllCardsByUser();
  const rewards = await getAllRewards()

  if (cardsResult.ok) {
    myCompanyCards = cardsResult.cards || [];
  } else {
    console.error(cardsResult.message);
  }

  return (

    <main className="flex flex-col">

      <SearchCompanySmallScreen />

      {session?.user && <UserCardSlider userCards={myCompanyCards} />}

      <ActivityTypeGrid />

      <CompanyCloserSlider companiesAll={companies} />

      <PopularRewardsSlider popularRewards={rewards} />

      <SliderHeader label={'Recomendados'} href={'/'} seeAllLabel={'Ver todos'} />

      <SliderHeader label={'Nuevos'} href={'/'} seeAllLabel={'Ver todos'} />

      <HowItWorks />

    </main>
  );
}
