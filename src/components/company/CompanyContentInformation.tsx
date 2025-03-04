import { CompanyClientDashboard } from "@/interfaces";
import { CompanyOpenHours, CompanyProfileMapComponent, CompanySocialMediaContact, MapComponent, MapProvider } from "..";

interface Props {
    company: CompanyClientDashboard;
}

export const CompanyContentInformation = ({ company }: Props) => {

    const hasLocation = company.lat !== null && company.lng !== null;

    const hasMedia =
        company.instagram ||
        company.facebook ||
        company.twitter ||
        company.whatsapp ||
        company.site ||
        company.phone;

    return (
        <div>
            {
                company.description &&
                <>
                    <h3 className="text-base font-semibold text-gray-800">¿Quienes somos?</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mb-4">{company.description}</p>
                </>
            }
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
                <div className="flex-col mt-4 sm:mt-0 ml-0 sm:ml-4 space-y-1">
                    <h3 className="text-base font-semibold text-gray-800">Dirección</h3>
                    <p className="text-slate-500 text-xs sm:text-sm">{company.address}</p>
                    {/* Opening hours section */}
                    <CompanyOpenHours openHours={company.openHours} />
                    {hasMedia && (
                        <CompanySocialMediaContact
                            instagram={company.instagram}
                            facebook={company.facebook}
                            twitter={company.twitter}
                            whatsapp={company.whatsapp}
                            phone={company.phone}
                            site={company.site}
                        />
                    )}
                </div>

            </div>
        </div>
    );
};
