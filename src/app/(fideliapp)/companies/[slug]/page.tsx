import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { checkUserCardForCompany, getCompanyBySlug } from "@/actions";
import { FaArrowRightToBracket, FaLocationDot, FaRegClock } from "react-icons/fa6";
import Link from "next/link";
import { CreateCardButton } from "@/components";
import { FaCalendarAlt } from "react-icons/fa";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const company = await getCompanyBySlug(slug);

  return {
    title: company?.name ?? "Producto no encontrado",
    description: company?.activityType.name ?? "",
  };
}

export default async function CompanyBySlugPage({ params }: Props) {

  const { slug } = params;

  if (!slug) {
    redirect("/");
  }

  const company = await getCompanyBySlug(slug);
  const { userCardForCompany, cardId } = await checkUserCardForCompany(slug);

  if (!company) {
    redirect("/");
    return null;
  }

  return (
    <div>
      {/* Header Section */}
      <header
        className={`bg-white border-2 shadow-sm rounded-lg p-4 relative ${userCardForCompany ? "border-green-500" : "border-slate-200"
          }`}
      >
        <div className="flex items-center space-x-6">
          <div className="w-28 h-28 flex items-center justify-center">
            {company.CompanyLogo ? (
              <img
                src={company.CompanyLogo.url}
                alt={`${company.name} logo`}
                className="w-24 h-24 object-cover rounded-full"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-2xl">{company.name.charAt(0)}</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold text-gray-800">{company.name}</h1>
            <p className="text-sm text-gray-500 mb-4">{company.activityType.name}</p>
            <div>
              {company.address && (
                <p className="text-md flex items-center">
                  <span className="inline sm:hidden">
                    <FaLocationDot className="text-sm" />
                  </span>
                  <span className="hidden sm:inline text-gray-700">
                    Dirección:
                  </span>
                  <span className="text-gray-500 ml-1">{company.address}</span>
                </p>
              )}
              {/* {company.openDays && (
                <p className="text-md flex items-center">
                  <span className="inline sm:hidden">
                    <FaCalendarAlt className="text-sm" />
                  </span>
                  <span className="hidden sm:inline text-gray-700">
                    Días:
                  </span>
                  <span className="text-gray-500 ml-1">{company.openDays}</span>
                </p>
              )} */}
              {/* {company.openHours && (
                <p className="text-md flex items-center">
                  <span className="inline sm:hidden">
                    <FaRegClock className="text-sm" />
                  </span>
                  <span className="hidden sm:inline text-gray-700">
                    Horario:
                  </span>
                  <span className="text-gray-500 ml-1">{company.openHours}</span>
                </p>
              )} */}
            </div>
          </div>
        </div>
        {/* Conditionally render the custom check icon or the buttons */}
        {userCardForCompany ? (
          <>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-600 border-2 border-white rounded-full -top-2 -right-2">
              ✔
            </div>
            <Link href={`/cards/${cardId}`} >
              <button className="absolute bottom-4 right-4 bg-slate-700 text-white text-sm py-2 px-2 rounded-lg shadow hover:bg-slate-950">
                <span className="block sm:hidden">
                  <FaArrowRightToBracket />
                </span>
                <span className="hidden sm:block">
                  Ver tarjeta
                </span>
              </button>
            </Link>
          </>
        ) : (
          <CreateCardButton slug={slug} />
        )}
      </header>
    </div>
  );
}
