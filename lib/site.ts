export const siteConfig = {
  name: "PlgCraft",
  title: "PlgCraft | Plugins, Integrations & Software Products",
  description:
    "PlgCraft builds plugins, integrations, free tools, and software products that solve real business problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://plgcraft.com",
  logoPath: "/plgLogo.svg",
};

export const mainNavLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
