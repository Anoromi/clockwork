import "reset-css";
import "./globals.scss";

import styles from "@/app/[locale]/layout.module.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Providers from "../providers";
import { routing } from "../routing";
import { BottomAppBar } from "./components/bottomAppBar";
import PageResizer from "./pageResizer";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// export async function generateStaticParams() {
//   return [{ locale: 'uk' }, { locale: 'en' }]
// }

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Show a 404 error if the user requests an unknown locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  let messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {
          <Providers>
            <PageResizer>
              <div className={styles.mainPage}>{children}</div>
              <BottomAppBar locale={locale} />
            </PageResizer>
          </Providers>
        }
      </NextIntlClientProvider>
    </html>
  );
}
