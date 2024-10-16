import { DeleteCell } from "./delete-cell";

type Props = {
  cellId: string;
};

export const TabConfigCell = ({ cellId }: Props) => {
  return (
    <div className="mt-10 space-y-6">
      <h4 className="text-xl font-semibold">Zona de perigo</h4>

      <div className="border border-red-500 rounded-xl p-4">
        <div className="flex flex-col gap-3">
          <div>
            <p className="font-semibold">Deletar essa célula</p>
            <p className="text-muted-foreground font-light">
              Depois de excluir uma célula, não há como voltar atrás. Por favor,
              tenha certeza.
            </p>
          </div>

          <div className="lg:w-40">
            <DeleteCell cellId={cellId} />
          </div>
        </div>
      </div>
    </div>
  );
};
