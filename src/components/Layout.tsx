import Footer from "./UI/Footer";
import Navbar from "./UI/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col py-4 md:px-8 px-4 lg:px-16 xl:px-32 bg-[#080d13]">
        {children}
      </div>
      <Footer />
    </div>
  );
};
export default Layout;
