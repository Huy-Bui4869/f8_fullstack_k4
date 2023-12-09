import "~/assets/globals.scss";
import "~/assets/globals.css";

import Header from "~/components/Header/Header";
import { i18n } from "../../../i18n.config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({ children, params }) {
  const { lang } = params;

  return (
    <html lang={lang}>
      <body className="bg--default min-h-screen text--colors_default">
        <Header />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: "F8 portfolio",
  description: "Generated by create next app",
};