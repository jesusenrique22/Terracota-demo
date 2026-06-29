import { cn } from "@/lib/utils";
import type { Clinic } from "@/lib/clinics";
import { TerracotaLogo } from "@/components/brand/logo";

type ClinicLogoProps = {
  clinic?: Clinic;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  variant?: "light" | "dark";
};

/** Siempre muestra la marca Terracota — sin fotos ni avatares */
export function ClinicLogo({
  size = "md",
  showText = true,
  className,
  variant = "dark",
}: ClinicLogoProps) {
  return (
    <TerracotaLogo
      size={size}
      showText={showText}
      className={className}
      variant={variant}
    />
  );
}
