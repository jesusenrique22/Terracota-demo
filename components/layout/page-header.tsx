import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
};

export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-5 pb-4 pt-5", className)}>
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-bold leading-tight tracking-tight text-charcoal">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-[11px] text-muted">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0 pt-0.5">{action}</div>}
    </div>
  );
}
