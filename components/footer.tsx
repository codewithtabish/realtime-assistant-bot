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
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo className="h-8" />
            <div>
              <p className="font-semibold text-lg">XAI Assistant</p>
              <p className="text-sm text-muted-foreground">Real-time AI Companion</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon }) => (
              <Button key={label} size="icon" variant="ghost" asChild>
                <Link href={href} target="_blank" aria-label={label}>
                  {icon}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Legal & Credits */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground border-t pt-6">
          <p>© {new Date().getFullYear()} XAI Assistant. All rights reserved.</p>
          
          <div className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="flex items-center gap-1.5">
            Built by{" "}
            <a
              href="https://github.com/codewithtabish"
              target="_blank"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Image
                src="https://github.com/codewithtabish.png"
                alt="codewithtabish"
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="font-medium">codewithtabish</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}