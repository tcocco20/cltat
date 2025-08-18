import Footer from "@/components/footer";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
