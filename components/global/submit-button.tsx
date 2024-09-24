import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  isFormDirty: boolean;
  isPending: boolean;
  labelLoading: string;
  labelButton: string;
};

export const SubmitButton = ({
  isFormDirty,
  isPending,
  labelButton,
  labelLoading,
}: Props) => {
  return (
    <>
      {isFormDirty && (
        <Button className="w-full p-5" disabled={!isFormDirty || isPending}>
          {isPending ? (
            <div className="flex items-center gap-x-3">
              <Loader2 className="size-5 animate-spin" /> {labelLoading}
            </div>
          ) : (
            <>{labelButton}</>
          )}
        </Button>
      )}
    </>
  );
};
