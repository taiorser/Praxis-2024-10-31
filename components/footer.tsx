import Link from 'next/link';
import { Trophy } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'ROI Calculator', href: '#calculator' },
        { label: 'Case Studies', href: '#case-studies' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'Help Center', href: '#help' },
        { label: 'API Reference', href: '#api' },
        { label: 'Status', href: '#status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
        { label: 'Security', href: '#security' },
        { label: 'Cookies', href: '#cookies' },
      ],
    },
  ];

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Praxis</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Transforming workplace culture through gamified recognition and engagement.
            </p>
          </div>
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Praxis. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="#twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="#linkedin"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="#github"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}