import { StateMessage } from "@/components/StateMessage";

export default function Loading() {
  return (
    <main className="px-4 md:px-14 py-12">
      <StateMessage
        title="Carregando vitrine"
        description="Estamos buscando os dados mais recentes da Naty Modas."
      />
    </main>
  );
}
