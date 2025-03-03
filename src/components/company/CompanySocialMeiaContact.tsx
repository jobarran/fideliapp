import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp, FaPhone } from "react-icons/fa";

interface Props {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  whatsapp?: string;
  phone?: string;
}

export const CompanySocialMediaContact = ({ instagram, facebook, twitter, whatsapp, phone }: Props) => {
  return (
    <div className="mt-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800">Contacto y Redes Sociales</h3>
      <div className="flex flex-col space-y-2 text-slate-500 text-sm">
        {instagram && (
          <div className="flex items-center">
            <FaInstagram className="mr-2 text-pink-500" />
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {instagram}
            </a>
          </div>
        )}
        {facebook && (
          <div className="flex items-center">
            <FaFacebook className="mr-2 text-blue-500" />
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {facebook}
            </a>
          </div>
        )}
        {twitter && (
          <div className="flex items-center">
            <FaTwitter className="mr-2 text-blue-400" />
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {twitter}
            </a>
          </div>
        )}
        {whatsapp && (
          <div className="flex items-center">
            <FaWhatsapp className="mr-2 text-green-500" />
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {whatsapp}
            </a>
          </div>
        )}
        {phone && (
          <div className="flex items-center">
            <FaPhone className="mr-2 text-gray-500" />
            <a href={`tel:${phone}`} className="hover:underline">
              {phone}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
