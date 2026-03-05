'use client';

import { useState, useTransition } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface SignupFormProps {
  locale: string;
}

export function SignupForm({ locale }: SignupFormProps) {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [name, setName] = useState('');
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
        formData.set('name', name);
        formData.set('flow', 'signUp');
        const result = await signIn('password', formData);
        console.log('[SignupForm] signIn result:', result);
        router.push(`/${locale}`);
      } catch (err) {
        const msg = err instanceof Error ? err.message : '';
        if (msg.includes('already exists')) {
          setError(
            isRtl
              ? 'هذا الحساب موجود بالفعل. قم بتسجيل الدخول.'
              : 'Ce compte existe deja. Connectez-vous.'
          );
        } else {
          setError(
            isRtl
              ? 'خطأ في إنشاء الحساب. تحقق من اتصالك.'
              : 'Erreur lors de la creation du compte. Verifiez votre connexion.'
          );
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{isRtl ? 'الاسم' : 'Nom'}</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </div>
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
          minLength={6}
          autoComplete="new-password"
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending
          ? isRtl
            ? 'جار التحميل...'
            : 'Chargement...'
          : isRtl
            ? 'إنشاء حساب'
            : "S'inscrire"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isRtl ? 'لديك حساب بالفعل؟' : 'Deja un compte ?'}{' '}
        <Link
          href={`/${locale}/auth/login`}
          className="text-primary hover:underline"
        >
          {isRtl ? 'تسجيل الدخول' : 'Se connecter'}
        </Link>
      </p>
    </form>
  );
}
