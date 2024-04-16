import { Inter } from "next/font/google";
import "./globals.scss";
import RQProvider from "./_components/RQProvider";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import AuthProvider from "./_components/AuthProvider";
import { auth } from "@/auth";
import Toast from "./_components/Toast";
import ConfirmModal from "./_components/ConfirmModal";
import Progressbar from "./_components/Progresbar";
import { Metadata, Viewport } from "next";
import { PWALifeCycle } from "./_components/PWALifiCycle";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Honey-Box";
const APP_DEFAULT_TITLE = "Honey-Box";
const APP_TITLE_TEMPLATE = "%s - Honey-Box";
const APP_DESCRIPTION =
  "수백만 개의 영화, TV 프로그램, 인물들을 지금 만나보세요.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#000",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="wrapper">
          <RQProvider>
            <AuthProvider>
              <Progressbar />
              <Header session={session} />
              <main>{children}</main>
              <Toast />
              <PWALifeCycle />
              <ConfirmModal />
            </AuthProvider>
          </RQProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
