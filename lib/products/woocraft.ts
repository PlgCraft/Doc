import type { Product } from "../data.type";
import { productStatuses } from "../data.type";
import { platformBadges} from "../platformBadges";

export const woocraft = {
  id: "woocraft",
  name: "woocraft",
  shortDescription:
    "A free, open source command line tool that scaffolds a real WooCommerce extension (PSR-4 PHP, React admin UI, phpcs and PHPStan built in) and takes it all the way to a Marketplace-ready zip.",
  fullDescription: `Most guides on building a WooCommerce extension stop at hello world. The moment you need Marketplace-quality code, security-focused linting, PHPStan checked against the WordPress function surface, translations, and a clean production zip, you're wiring all of that together by hand, usually by copying whatever the last extension did and hoping it still works.

woocraft is the command line tool that does that wiring for you. Run one command and you get a real extension: PSR-4 PHP with a Composer autoloader, a REST route already registered, an admin screen built with React, Vite and Tailwind, and a plugin header that already has the fields WooCommerce and WordPress.org actually check. Nothing to assemble, nothing to configure before you can start writing your own feature.

From there, every command you need lives behind npm run. lint and stan run PHP_CodeSniffer and PHPStan against a ruleset generated straight from your plugin header and composer.json, so there's no phpcs.xml or phpstan.neon to maintain by hand. deploy builds the admin UI, mirrors the compiled plugin into a real local WordPress install (a plain path or a DevKinsta site, picked once and remembered), activates it, and runs wp plugin check against it. build does all of that, then packages an isolated, Marketplace-ready zip: production Composer autoloader, no dev dependencies, no .git, no Vite source, nothing that doesn't belong in a submission, then runs the same QIT tests WooCommerce's own Marketplace review runs, checking first that your extension is actually registered so you never burn a build on a test that can't possibly pass yet.

All of it is driven by one file, woocraft.json, committed at your project root. Set your description, PHP, WordPress or WooCommerce requirements, or which PHPStan release to pin, and the next deploy or build writes it into the plugin header, composer.json, package.json and readme.txt for you. Add an entry to a version log and that becomes your official release, your changelog.txt entry, and your readme.txt changelog, all at once, all dated, all left alone once written unless you change them yourself. Get something wrong in the file and woocraft tells you exactly what and how to fix it, instead of failing somewhere confusing three steps later.

woocraft is free, open source under the MIT license, and built the same way the extensions it scaffolds are meant to be built: reviewed, documented, and something you can actually read all the way through.`,
  category: "plugin",
  platform: ["woocommerce", "github"],
  statusId: productStatuses.live.id,
  icon: "/products/woocraft/logo.png",
  accentColor: "#FE002B",
  version: "0.1.3",
  releaseDate: "2026-09-05",
  pricing: {
    label: "Free & open source",
    kind: "free",
  },
  screenshots: [
    "/products/woocraft/hero.png",
    "/products/woocraft/screen-new.png",
    "/products/woocraft/screen-help.png",
    "/products/woocraft/screen-build.png",
  ],
  features: [
    {
      title: "Scaffold a real extension, not a stub",
      description:
        "PSR-4 PHP with a Composer autoloader, a REST route already registered, and an admin screen built with React, Vite and Tailwind, all wired together and ready to run.",
      icon: "terminal",
    },
    {
      title: "phpcs and PHPStan, already configured",
      description:
        "A PHP_CodeSniffer ruleset and PHPStan level 5 with WordPress and WooCommerce stubs, both generated from your plugin header and composer.json. No config files to maintain by hand.",
      icon: "shield-check",
    },
    {
      title: "Deploys straight into WordPress",
      description:
        "Mirrors the compiled plugin into a real local install, a plain path or a DevKinsta site, activates it, and runs wp plugin check. Run it again after every change.",
      icon: "refresh-cw",
    },
    {
      title: "One config file, not scattered settings",
      description:
        "woocraft.json holds your description, requirements, PHPStan version, release log, QIT setup and WordPress target. Get something wrong and it tells you exactly what.",
      icon: "file-text",
    },
    {
      title: "A changelog that writes itself",
      description:
        "Add a version and a one-line note to woocraft.json. The next deploy or build updates the plugin header, package.json, composer.json, readme.txt, and both changelogs.",
      icon: "layers",
    },
    {
      title: "Marketplace-ready packaging",
      description:
        "An isolated production build: no dev dependencies, no .git, no Vite source, no composer.lock, nothing that doesn't belong in a submission.",
      icon: "package",
    },
    {
      title: "QIT built in, not bolted on",
      description:
        "Runs the same quality tests WooCommerce's own Marketplace review runs, and checks your extension is actually registered before wasting a build on a test that can't pass yet.",
      icon: "zap",
    },
    {
      title: "Translations out of the box",
      description: "Generates languages/<slug>.pot from every translatable string in the plugin, via WP-CLI.",
      icon: "globe",
    },
  ],
  techStack: ["Node.js", "TypeScript", "PHP_CodeSniffer", "PHPStan", "Composer", "WP-CLI"],
  storeLinks: {
    github: { ...platformBadges.github, href: "https://github.com/PlgCraft/woocraft" },
  },
  videoDemo: "",
  testimonials: [],
  featured: true,
  glossary: {
    eyebrow: "Before you dive in",
    heading: "A FEW TERMS",
    headingAccent: "WORTH KNOWING",
    intro: "A handful of woocraft-specific terms come up throughout, worth having straight upfront.",
    terms: [
      {
        term: "woocraft.json",
        definition:
          "The one file woocraft reads and writes, committed at your project root. It holds your description, version requirements, PHPStan pin, release log, QIT setup and WordPress target.",
      },
      {
        term: "QIT",
        definition:
          "WooCommerce's own Quality Insights Toolkit: security, PHPStan, PHP compatibility, the WordPress.org plugin checker, and an activation test. The same suite the Marketplace review itself runs.",
      },
      {
        term: "System Under Test (SUT)",
        definition:
          "The extension listing on your WooCommerce.com account that QIT actually tests against, identified by its slug or ID there, not just any zip you hand it.",
      },
      {
        term: "Marketplace-ready zip",
        definition:
          "What npm run build produces: a clean, isolated copy of the plugin with a production autoloader and nothing that shouldn't ship, packaged separately from your own working directory.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How It Works",
    heading: "FROM ZERO TO",
    headingAccent: "MARKETPLACE READY",
    intro: "Three commands cover the whole lifecycle: scaffold it, build it, ship it.",
    steps: [
      {
        tag: "One command to start",
        title: "Scaffold a real extension",
        description:
          "Answer a few questions (name, slug, PHP namespace, which local WordPress to deploy into) and woocraft installs everything, warms the toolchain, and deploys the plugin right away.",
        images: [
          {
            src: "/products/woocraft/screen-new.png",
            width: 2160,
            height: 1626,
            alt: "npx woocraft new scaffolding a fresh extension",
          },
        ],
      },
      {
        tag: "Every command in one place",
        title: "npm run, not fifteen different tools",
        description:
          "lint, stan, check, deploy, build, qit, pot. Config is generated, not hand-maintained, and every flag is documented right there in the help output.",
        images: [
          {
            src: "/products/woocraft/screen-help.png",
            width: 2160,
            height: 1356,
            alt: "The full woocraft command reference",
          },
        ],
      },
      {
        tag: "Ship with confidence",
        title: "One command to a Marketplace-ready zip",
        description:
          "npm run build checks, translates, deploys, verifies with wp plugin check, packages an isolated zip, then runs QIT against it. A clean run means you're actually ready to submit.",
        images: [
          {
            src: "/products/woocraft/screen-build.png",
            width: 2160,
            height: 1518,
            alt: "npm run build running checks, packaging, and QIT",
          },
        ],
      },
    ],
    closing: {
      title: "Free, open source, and yours to read.",
      description:
        "No account, no lock-in, no hidden tier. Install it, scaffold your extension, and read every line of what it generates.",
      badges: [
        "PSR-4 + Composer autoloader",
        "phpcs & PHPStan built in",
        "QIT Marketplace tests",
        "One config file",
        "MIT licensed",
      ],
    },
  },
} satisfies Product;
