import { CompanyClientDashboard } from "@/interfaces";
import { CompanyProfileMapComponent, MapComponent, MapProvider } from "..";
import { formatOpenHours } from "@/utils";

interface Props {
    company: CompanyClientDashboard;
}

export const CompanyContentInformation = ({ company }: Props) => {

    const hasLocation = company.lat !== null && company.lng !== null;

    return (
        <div>
            <div className="flex justify-between items-center mt-1 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Información</h2>
            </div>
            <div className="flex flex-col sm:flex-row mt-4">
                <div className="w-full sm:w-2/3">
                    {hasLocation ? (
                        <MapProvider>
                            <CompanyProfileMapComponent
                                companyLocation={{
                                    lat: company.lat as number, // Assert as number
                                    lng: company.lng as number, // Assert as number
                                }}
                                companyName={company.name}
                                activityType={company.activityType.name}
                            />
                        </MapProvider>
                    ) : (
                        <p className="text-gray-600">Location data is unavailable.</p>
                    )}
                </div>
                {/* Opening hours section */}
                <div className="flex-1 mt-4 sm:mt-0 ml-0 sm:ml-4">
                    <h3 className=" text-base sm:text-lg font-semibold text-gray-800">Horarios</h3>
                    <p className="text-gray-600 whitespace-pre-line text-xs sm:text-sm">
                        {formatOpenHours(company.openHours)}
                    </p>
                </div>
                {/* Map section */}
            </div>
        </div>
    );
};
