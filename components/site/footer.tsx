import {
  contactInfo,
  footerInfo,
  footerLinks,
  socialMediaLinks,
} from "@/constants";

export const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">Sobre Nós</h4>
            <ul>
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Serviços</h4>
            <ul>
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Contatos</h4>
            <p>{contactInfo.address}</p>
            <p>
              <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                {contactInfo.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="hover:underline"
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          {socialMediaLinks.map(({ platform, href, icon: Icon }) => (
            <a
              key={platform}
              href={href}
              className="text-white hover:text-gray-400"
            >
              <Icon className="text-2xl" />
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <p>
            {footerInfo.copyrightText.replace(
              "[YEAR]",
              footerInfo.year.toString()
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};
