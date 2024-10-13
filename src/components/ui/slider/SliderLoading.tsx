import { UserCardLoading, CompanyLinkLoading } from '../..'; // Make sure to import CompanyLinkLoading

interface Props {
    sliderType: "userCard" | "company",
}

export const SliderLoading = ({ sliderType }: Props) => {
    return (
        <div className="flex flex-row gap-2 flex-nowrap overflow-hidden">
            {/* Conditionally render loading components based on sliderType */}
            {sliderType === "userCard" ? (
                Array.from({ length: 5 }).map((_, index) => (
                    <div className="w-70 flex-shrink-0" key={index}> {/* Set a fixed width */}
                        <UserCardLoading />
                    </div>
                ))
            ) : (
                Array.from({ length: 10 }).map((_, index) => (
                    <div className="w-24 flex-shrink-0" key={index}> {/* Set a fixed width */}
                        <CompanyLinkLoading />
                    </div>
                ))
            )}
        </div>
    );
};
