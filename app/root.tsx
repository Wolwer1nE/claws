import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { I18nProvider, useI18n } from "~/i18n/context";
import { LanguageSwitcher } from "~/components/LanguageSwitcher";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

function Navigation() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useI18n();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHomePage ? 'bg-transparent' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">


          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isHomePage ? 'text-white' : 'text-gray-700'
              } ${location.pathname === "/" ? "text-blue-600" : ""}`}
            >
              {t.home}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button className={`p-2 rounded-md transition-colors ${
              isHomePage ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <I18nProvider>
          <Navigation />

          {/* Основной контент */}
          <main className="pt-16">
            {children}
          </main>

          {/* Футер */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


                <div>
                  <h4 className="text-lg font-semibold mb-4">Контакты</h4>
                  <p className="text-gray-400">
                    @PavelOganesyan
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 Оганесян П.А.</p>
              </div>
            </div>
          </footer>
        </I18nProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
