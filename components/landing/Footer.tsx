import { Logo } from "../Logo";

export const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-black py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <div className="text-gray-600 font-mono text-sm">
            © {new Date().getFullYear()} All rights reserved. Built with 🖤
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold">SWISS BRUTALIST DESIGN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
