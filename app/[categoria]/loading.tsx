import { StateMessage } from "@/components/StateMessage";

export default function Loading() {
  return (
    <main className="px-4 md:px-14 py-12">
      <StateMessage
        title="Carregando categoria"
        description="Estamos buscando os produtos desta categoria."
      />
    </main>
  );
}
