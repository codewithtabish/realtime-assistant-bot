import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/github-icon";
import { XIcon } from "@/components/x-icon";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#blog", label: "Blog" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const legalLinks = [
  { href: "#", label: "License" },
  { href: "#", label: "Privacy" },
];

const socialLinks = [
  {
    href: "https://x.com/codewithtabish",
    label: "X",
    icon: <XIcon className="h-4 w-4" />,
  },
  {
    href: "https://github.com/codewithtabish",
    label: "GitHub",
    icon: <GithubIcon className="h-4 w-4" />,
  },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-5xl border-t bg-background px-4 md:px-6">
      <div className="flex flex-col gap-8 py-8">
        {/* Top */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-8" />

            <div>
              <p className="text-lg font-semibold">XAI Assistant</p>
              <p className="text-sm text-muted-foreground">
                Real-time AI Companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Button size="icon" variant="ghost">
                  {icon}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} XAI Assistant. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <a
            href="https://github.com/codewithtabish"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Image
              src="https://github.com/codewithtabish.png"
              alt="codewithtabish"
              width={20}
              height={20}
              className="rounded-full"
            />

            <span>Built by</span>

            <span className="font-medium">codewithtabish</span>
          </a>
        </div>
      </div>
    </footer>
  );
}