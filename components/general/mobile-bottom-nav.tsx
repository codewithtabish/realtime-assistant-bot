"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Heart, Settings } from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/books",
      label: "Books",
      icon: BookOpen,
    },
    {
      href: "/bookmarks",
      label: "Bookmarks",
      icon: Heart,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <nav
      className="
        md:hidden
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        bg-background/95
        backdrop-blur-xl
        supports-[backdrop-filter]:bg-background/80
      "
    >
      <div className="grid grid-cols-4 px-2 py-2">
        {links.map((link) => {
          const Icon = link.icon;

          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="
                flex
                items-center
                justify-center
              "
            >
              <div
                className={`
                  flex flex-col items-center justify-center
                  rounded-2xl px-3 py-2
                  transition-all duration-300
                  ${
                    active
                      ? "bg-primary/10 shadow-sm scale-105"
                      : "hover:bg-muted"
                  }
                `}
              >
                <Icon
                  className={`
                    h-5 w-5 mb-1 transition-all duration-300
                    ${
                      active
                        ? "text-primary scale-110"
                        : "text-muted-foreground"
                    }
                  `}
                />

                <span
                  className={`
                    text-[11px] font-medium transition-colors
                    ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground"
                    }
                  `}
                >
                  {link.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}