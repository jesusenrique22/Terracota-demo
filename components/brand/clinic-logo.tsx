import { cn } from "@/lib/utils";
import type { Clinic } from "@/lib/clinics";
import { BrandLogo } from "@/components/brand/logo";

type ClinicLogoProps = {
  clinic?: Clinic;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  variant?: "light" | "dark";
};

/** Siempre muestra la marca de la clínica — sin fotos ni avatares */
export function ClinicLogo({
  size = "md",
  showText = true,
  className,
  variant = "dark",
}: ClinicLogoProps) {
  return (
    <BrandLogo
      size={size}
      showText={showText}
      className={className}
      variant={variant}
    />
  );
}
