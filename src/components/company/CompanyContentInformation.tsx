import { CompanyClientDashboard } from "@/interfaces";
import { CompanyOpenHours, CompanyProfileMapComponent, MapComponent, MapProvider } from "..";
import { formatOpenHours } from "@/utils";

interface Props {
    company: CompanyClientDashboard;
}

export const CompanyContentInformation = ({ company }: Props) => {

    const hasLocation = company.lat !== null && company.lng !== null;

    return (
        <div>
            <div className="flex flex-col sm:flex-row">
                {/* Map section */}
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
                <div className="flex-col mt-4 sm:mt-0 ml-0 sm:ml-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Dirección</h3>
                    <p className="text-slate-500 text-xs sm:text-sm">{company.address}</p>
                    {/* Opening hours section */}
                    <CompanyOpenHours openHours={company.openHours} />
                </div>

            </div>
        </div>
    );
};
