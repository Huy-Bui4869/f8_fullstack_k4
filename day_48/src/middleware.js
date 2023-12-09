import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { i18n } from "../i18n.config";

function getLocale(request) {
  // Negotiator expects plain object so we need to transform headers
  var negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // if (pathname.startsWith("/") || !pathname) {
  //   const urlLogin = `${request.nextUrl.origin}/en`;
  //   return NextResponse.redirect(urlLogin);
  // }

  //Kiểm tra xem có ngôn ngữ nào được hỗ trợ trong tên đường dẫn không
  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.some(
    //!nếu đường dẫn bắt đầu bằng (locale)
    (locale) => pathname.startsWith(`/${locale}`) || pathname === `/${locale}`
  );

  // Chuyển hướng nếu không có ngôn ngữ
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) return;

  // const response = NextResponse.next();
  const locale = getLocale(request);

  // response.cookies.set({
  //   name: "lang",
  //   value: locale,
  //   path: "",
  //   httpOnly: true,
  //   maxAge: 86400,
  // });
  // The new URL is now /en
  const urlLogin = `${request.nextUrl.origin}/${locale}`;
  return NextResponse.redirect(urlLogin);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
