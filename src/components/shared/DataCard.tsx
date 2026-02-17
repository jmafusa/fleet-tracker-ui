import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DataCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const DataCard = ({ children, className }: DataCardProps) => {
  return (
    <Card className={className}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
