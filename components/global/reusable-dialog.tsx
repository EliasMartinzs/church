import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  headerStyle?: string;
  textAlign?: "start" | "center";
  content: React.ReactNode;
  open: boolean;
  setOpen: (prevState: boolean) => void;
};

export const ReusableDialog = ({
  title,
  trigger,
  description,
  headerStyle,
  content,
  textAlign = "start",
  open,
  setOpen,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent showClose={false}>
        <DialogHeader className={headerStyle}>
          <DialogTitle className={cn(`text-${textAlign}`)}>{title}</DialogTitle>
          <DialogDescription className={cn(`text-${textAlign}`)}>
            {description}
          </DialogDescription>
        </DialogHeader>

        {content}
      </DialogContent>
    </Dialog>
  );
};
