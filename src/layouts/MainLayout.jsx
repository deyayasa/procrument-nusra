import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <main className="max-w-[1600px] mx-auto px-10 py-10">
        {children}
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;
