export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-frame flex min-h-dvh flex-col">
      {children}
    </div>
  );
}
