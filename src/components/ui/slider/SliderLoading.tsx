import { UserCardLoading, CompanyLinkLoading, ProductRewardLinkLoading, CompanyLinkWidgetLoading, ProductPromoLinkLoading } from '../..'; // Make sure to import RewardCardLoading

interface Props {
    sliderType: "userCard" | "company" | "reward" | "promotion",
}

export const SliderLoading = ({ sliderType }: Props) => {
    return (
        <div className="flex flex-row gap-2 flex-nowrap overflow-hidden mt-2 mb-4">
            {/* Conditionally render loading components based on sliderType */}
            {sliderType === "userCard" ? (
                Array.from({ length: 5 }).map((_, index) => (
                    <div className="w-70 flex-shrink-0" key={index}> {/* Set a fixed width */}
                        <UserCardLoading />
                    </div>
                ))
            ) : sliderType === "company" ? (
                Array.from({ length: 10 }).map((_, index) => (
                    <div className="w-24 flex-shrink-0" key={index}> {/* Set a fixed width */}
                        <CompanyLinkLoading />
                        <CompanyLinkWidgetLoading />
                    </div>
                ))
            ) : sliderType === "reward" ? (
                Array.from({ length: 4 }).map((_, index) => (
                    <div className="w-70 flex-shrink-0" key={index}> {/* Set a fixed width */}
                        <ProductRewardLinkLoading />
                    </div>
                ))
            ) : sliderType === "promotion" ? (
                Array.from({ length: 4 }).map((_, index) => (
                    <div className="w-70 flex-shrink-0" key={index}> {/* Set a fixed width */}
                        <ProductPromoLinkLoading />
                    </div>
                ))
            ) : null}        </div>
    );
};
