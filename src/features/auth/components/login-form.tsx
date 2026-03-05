'use client';

import { useState, useTransition } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface LoginFormProps {
  locale: string;
}

export function LoginForm({ locale }: LoginFormProps) {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const isRtl = locale === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set('email', email);
        formData.set('password', password);
        formData.set('flow', 'signIn');
        const result = await signIn('password', formData);
        console.log('[LoginForm] signIn result:', result);
        router.push(`/${locale}`);
      } catch (err) {
        console.error('[LoginForm] signIn error:', err);
        setError(
          isRtl
            ? 'بريد إلكتروني أو كلمة مرور غير صحيحة'
            : 'Email ou mot de passe incorrect. Verifiez votre connexion.'
        );
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{isRtl ? 'البريد الإلكتروني' : 'Email'}</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">
          {isRtl ? 'كلمة المرور' : 'Mot de passe'}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending
          ? isRtl
            ? 'جار التحميل...'
            : 'Chargement...'
          : isRtl
            ? 'تسجيل الدخول'
            : 'Se connecter'}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isRtl ? 'ليس لديك حساب؟' : 'Pas encore de compte ?'}{' '}
        <Link
          href={`/${locale}/auth/signup`}
          className="text-primary hover:underline"
        >
          {isRtl ? 'إنشاء حساب' : "S'inscrire"}
        </Link>
      </p>
    </form>
  );
}
