type Props = {
  children?: React.ReactNode;
};

export default function NotFound({ children }: Props) {
  return (
    <div className="w-full h-dvh overflow-hidden flex items-center justify-center absolute inset-0 left-0 -z-50">
      {children}
    </div>
  );
}
