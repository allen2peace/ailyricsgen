import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function MainHeader() {
  const t = useTranslations();
  return (
    <Link href="/" className="flex space-x-3">
      <Image
        alt="header text"
        src="/logo.svg"
        className="h-8 w-8 sm:h-12 sm:w-12"
        width={32}
        height={32}
      />
      <h1 className="ml-2 flex items-center text-2xl font-extralight tracking-tight sm:text-4xl">
        {t('title_header')}
      </h1>
    </Link>
  );
}
