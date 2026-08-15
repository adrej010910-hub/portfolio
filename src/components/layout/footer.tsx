import { Github, Mail, Send, Palette } from "lucide-react";
import { siteConfig, navLinks } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = [
    { href: siteConfig.github, label: "GitHub", icon: Github },
    { href: siteConfig.telegram, label: "Telegram", icon: Send },
    { href: `mailto:${siteConfig.email}`, label: "Email", icon: Mail },
    { href: siteConfig.behance, label: "Behance", icon: Palette },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07]">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-60" aria-hidden />
      <div className="container-x relative py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#top" className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500 text-sm font-bold text-white">{siteConfig.name.charAt(0)}</span><span className="text-sm font-semibold text-white">{siteConfig.name}<span className="text-slate-400">.dev</span></span></a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">Web Developer & UI/UX Designer. Создаю современные сайты, интерфейсы и digital experiences.</p>
          </div>
          <div><h4 className="text-sm font-semibold text-white">Навигация</h4><ul className="mt-4 grid grid-cols-2 gap-2">{navLinks.map((link) => <li key={link.href}><a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-cyan-300">{link.label}</a></li>)}</ul></div>
          <div><h4 className="text-sm font-semibold text-white">Контакты</h4><div className="mt-4 flex gap-3">{socials.map(({ href, label, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="glass flex h-11 w-11 items-center justify-center rounded-full text-slate-300 transition-all duration-300 hover:border-indigo-400/50 hover:text-white hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]"><Icon className="h-4.5 w-4.5" /></a>)}</div><p className="mt-4 text-sm text-slate-400">{siteConfig.email}</p></div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row"><p className="text-sm text-slate-500">© {year} {siteConfig.name}. Все права защищены.</p><p className="text-sm text-slate-500">Сделано с <span className="text-rose-400">♥</span> и вниманием к деталям</p></div>
      </div>
    </footer>
  );
}
