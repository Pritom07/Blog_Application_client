import { Navbar } from "@/components/layout/Navbar";

const commonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-1.5">
      <Navbar />
      {children}
    </div>
  );
};

export default commonLayout;
