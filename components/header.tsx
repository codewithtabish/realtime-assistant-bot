"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/general/themes/theme-toggle";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Books", href: "/books" },
  { label: "About", href: "/about" },
];

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
            scrolled,
        }
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          }
        )}
      >
        {/* Logo */}
        <Link href="/" className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50">
          <Logo className="h-4" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Buttons + Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>

          <Button size="sm" asChild>
            <Link href="/get-started">Get Started</Link>
          </Button>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}