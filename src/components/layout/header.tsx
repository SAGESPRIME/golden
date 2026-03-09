import { HeaderAnnouncement } from './header-announcement';
import { HeaderUtility } from './header-utility';
import { HeaderMainBar } from './header-main-bar';
import { HeaderCategoryNav } from './header-category-nav';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  return (
    <>
      <HeaderAnnouncement locale={locale} />
      <HeaderUtility locale={locale} />
      <HeaderMainBar locale={locale} />
      <HeaderCategoryNav locale={locale} />
    </>
  );
}
