import { CompanyClientDashboard } from "@/interfaces";
import { CompanyProfileMapComponent, MapComponent, MapProvider } from "..";

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
            <div className="mt-4">
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
        </div>
    );
};