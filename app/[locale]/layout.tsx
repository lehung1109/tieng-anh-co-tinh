import InstallPrompt from "@/components/install-prompt/install-prompt";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}

      <div className="fixed bottom-0 right-0">
        <InstallPrompt />
      </div>
    </>
  );
};

export default Layout;
