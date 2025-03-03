import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaPhone, FaLink } from "react-icons/fa";

interface Props {
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  whatsapp: string | null;
  phone: string | null;
  site: string | null;
}

export const CompanySocialMediaContact = ({ instagram, facebook, twitter, whatsapp, phone, site }: Props) => {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-800">Contacto y Redes Sociales</h3>
      <div className="flex flex-col text-slate-500  text-xs sm:text-sm space-y-0.5">
        {instagram && (
          <div className="flex items-center text-slate-800">
            <FaInstagram className="mr-2" />
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">
              {instagram}
            </a>
          </div>
        )}
        {facebook && (
          <div className="flex items-center text-slate-800">
            <FaFacebook className="mr-2" />
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">
              {facebook}
            </a>
          </div>
        )}
        {twitter && (
          <div className="flex items-center text-slate-800">
            <FaTwitter className="mr-2" />
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">
              {twitter}
            </a>
          </div>
        )}
        {whatsapp && (
          <div className="flex items-center text-slate-800">
            <FaWhatsapp className="mr-2" />
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">
              {whatsapp}
            </a>
          </div>
        )}
        {phone && (
          <div className="flex items-center text-slate-800">
            <FaPhone className="mr-2" />
            <a href={`tel:${phone}`} className="hover:font-semibold">
              {phone}
            </a>
          </div>
        )}
        {site && (
          <div className="flex items-center text-slate-800">
            <FaLink className="mr-2" />
            <a href={site} target="_blank" rel="noopener noreferrer" className="hover:font-semibold">
              {site}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
