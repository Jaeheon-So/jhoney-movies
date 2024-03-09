import { Inter } from "next/font/google";
import "./globals.scss";
import RQProvider from "./_components/RQProvider";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import AuthProvider from "./_components/AuthProvider";
import { auth } from "@/auth";
import Toast from "./_components/Toast";
import ConfirmModal from "./_components/ConfirmModal";

const inter = Inter({ subsets: ["latin"] });

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
              <Header session={session} />
              <main>{children}</main>
              <Toast />
              <ConfirmModal />
            </AuthProvider>
          </RQProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
