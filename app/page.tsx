import { AnimatedThemeToggler } from '@/components/theme/animated-theme-toggler';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 font-sans">
      <AnimatedThemeToggler />
    </div>
  );
}
