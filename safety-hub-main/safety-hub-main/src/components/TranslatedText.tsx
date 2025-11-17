import { useLanguage } from "@/contexts/LanguageContext";

interface TranslatedTextProps {
  en: string;
  hi: string;
  pa: string;
  className?: string;
}

export const TranslatedText = ({ en, hi, pa, className }: TranslatedTextProps) => {
  const { language } = useLanguage();
  
  const text = language === "en" ? en : language === "hi" ? hi : pa;
  
  return <span className={className}>{text}</span>;
};
