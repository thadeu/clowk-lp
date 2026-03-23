import type { LucideIcon } from 'lucide-react';
import {
  Rocket,
  Gem,
  Atom,
  LayoutGrid,
  Server,
  Flame,
  Lightbulb,
  Lock,
  Mail,
  Globe,
  MessageCircle,
  Code2,
  Smartphone,
  Blocks,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  AlertTriangle,
  HandHelping,
  Plug,
  KeyRound,
  User,
  Fingerprint,
  Share2,
  Cookie,
} from 'lucide-react';

export interface ListItem {
  title: string;
  href: string;
  icon?: LucideIcon;
}

export interface SidebarSection {
  title: string;
  icon: LucideIcon;
  list: ListItem[];
}

export const contents: SidebarSection[] = [
  {
    title: 'Getting Started',
    icon: Rocket,
    list: [
      { title: 'Ruby on Rails', href: '/docs/quickstart/rails', icon: Gem },
      { title: 'React', href: '/docs/quickstart/react', icon: Atom },
      { title: 'Next.js', href: '/docs/quickstart/nextjs', icon: LayoutGrid },
      { title: 'Express', href: '/docs/quickstart/express', icon: Server },
      { title: 'Hono', href: '/docs/quickstart/hono', icon: Flame },
    ],
  },
  {
    title: 'Concepts',
    icon: Lightbulb,
    list: [
      { title: 'Clowk vs Clerk', href: '/docs/concepts/clowk-vs-clerk' },
      { title: 'OAuth', href: '/docs/concepts/oauth', icon: Share2 },
      { title: 'Session', href: '/docs/concepts/session', icon: Cookie },
    ],
  },
  {
    title: 'Authentication',
    icon: Lock,
    list: [
      { title: 'How it works', href: '/docs/authentication/how-it-works' },
      { title: 'Email & Password', href: '/docs/authentication/email-password', icon: Mail },
      { title: 'Google', href: '/docs/authentication/google', icon: Globe },
      { title: 'Twitter', href: '/docs/authentication/twitter', icon: MessageCircle },
      { title: 'GitHub', href: '/docs/authentication/github', icon: Code2 },
      { title: 'Apple', href: '/docs/authentication/apple', icon: Smartphone },
    ],
  },
  {
    title: 'Integrations',
    icon: Blocks,
    list: [
      { title: 'Ruby on Rails', href: '/docs/integrations/rails', icon: Gem },
      { title: 'React', href: '/docs/integrations/react', icon: Atom },
      { title: 'Next.js', href: '/docs/integrations/nextjs', icon: LayoutGrid },
      { title: 'Express', href: '/docs/integrations/express', icon: Server },
      { title: 'Hono', href: '/docs/integrations/hono', icon: Flame },
    ],
  },
  {
    title: 'API',
    icon: Plug,
    list: [
      { title: 'Overview', href: '/docs/api/overview', icon: KeyRound },
      { title: 'Verify Token', href: '/docs/api/verify-token', icon: Fingerprint },
      { title: 'Get User', href: '/docs/api/get-user', icon: User },
      { title: 'OpenID Connect', href: '/docs/api/openid-connect', icon: Globe },
    ],
  },
  {
    title: 'Reference',
    icon: BookOpen,
    list: [
      { title: 'FAQ', href: '/docs/reference/faq', icon: HelpCircle },
      { title: 'Security', href: '/docs/reference/security', icon: ShieldCheck },
      { title: 'Contributing', href: '/docs/reference/contributing', icon: HandHelping },
      { title: 'Errors', href: '/docs/reference/errors', icon: AlertTriangle },
    ],
  },
];
