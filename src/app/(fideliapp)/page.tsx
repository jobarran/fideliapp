import { getAllCardsByUser, getAllCompanies, getAllRewards } from "@/actions";
import { ActivityTypeGrid, CompanyCloserSlider, CompanyRecommendedSlider, HowItWorks, PopularPromoSlider, PopularRewardsSlider, SearchCompanySmallScreen, UserCardSlider } from '@/components';
import { UserCard } from "@/interfaces";
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

  const productRewards = rewards.filter(reward => reward.productType === 'PRODUCT');
  const promoRewards = rewards.filter(reward => reward.productType === 'PROMOTION');

  return (

    <main className="flex flex-col">

      <SearchCompanySmallScreen />

      {session?.user && <UserCardSlider userCards={myCompanyCards} userId={session?.user.id} showHeader={true} />}

      <ActivityTypeGrid />

      <CompanyCloserSlider companiesAll={companies} />

      <PopularRewardsSlider popularRewards={productRewards} />

      <PopularPromoSlider popularRewards={promoRewards} />

      <CompanyRecommendedSlider companiesAll={companies} />

      <HowItWorks />

    </main>
  );
}
