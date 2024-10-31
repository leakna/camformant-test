import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon | React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "flex-shrink-0 w-16 h-16 flex flex-col rounded-none justify-center items-center",
        isActive && "bg-muted text-primary"
      )}
    >
      <Icon className="size-5 stroke-2 shrink-0" />
      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
};
