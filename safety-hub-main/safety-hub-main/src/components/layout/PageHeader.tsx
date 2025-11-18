import { ReactNode } from "react";
import { TranslatedText } from "@/components/TranslatedText";
import { Badge } from "@/components/ui/badge";

type LocalizedCopy = {
  en: string;
  hi: string;
  pa: string;
};

type CopyProp = LocalizedCopy | string;

interface Highlight {
  label: CopyProp;
  value: string;
  helper?: string;
}

interface PageHeaderProps {
  title: LocalizedCopy;
  description?: CopyProp;
  badge?: CopyProp;
  icon?: ReactNode;
  actions?: ReactNode;
  highlights?: Highlight[];
}

const renderCopy = (copy?: CopyProp) => {
  if (!copy) return null;
  if (typeof copy === "string") return copy;
  return <TranslatedText {...copy} />;
};

export const PageHeader = ({ title, description, badge, icon, actions, highlights }: PageHeaderProps) => {
  return (
    <section className="glass-panel border border-white/60 rounded-[32px] p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          {badge && (
            <Badge variant="outline" className="w-fit rounded-full border-white/60 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.35em]">
              {renderCopy(badge)}
            </Badge>
          )}
          <div className="flex items-start gap-3">
            {icon && (
              <div className="rounded-2xl border border-white/60 bg-white/70 p-3 text-primary shadow-sm shadow-primary/30">
                {icon}
              </div>
            )}
            <div>
              <h2 className="font-display text-3xl font-semibold text-foreground">
                <TranslatedText {...title} />
              </h2>
              {description && (
                <p className="mt-2 text-sm text-muted-foreground max-w-3xl">{renderCopy(description)}</p>
              )}
            </div>
          </div>
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>

      {highlights && highlights.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, idx) => (
            <div
              key={`${item.value}-${idx}`}
              className="rounded-[24px] border border-white/60 bg-white/70 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {renderCopy(item.label)}
              </p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{item.value}</p>
              {item.helper && <p className="text-xs text-muted-foreground mt-1">{item.helper}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

