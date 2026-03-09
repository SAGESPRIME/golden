'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import type { User as UserType } from '@/types';

interface ProfileCardProps {
  user: UserType;
  locale: string;
}

export function ProfileCard({ user, locale }: ProfileCardProps) {
  const isRtl = locale === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="size-5" />
          {isRtl ? 'الملف الشخصي' : 'Profil'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <span className="text-sm text-muted-foreground">
            {isRtl ? 'الاسم' : 'Nom'}
          </span>
          <p className="font-medium">{user.name ?? '-'}</p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">
            {isRtl ? 'البريد الإلكتروني' : 'Email'}
          </span>
          <p className="font-medium">{user.email ?? '-'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
