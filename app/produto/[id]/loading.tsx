import { StateMessage } from "@/components/StateMessage";

export default function Loading() {
  return (
    <main className="px-4 md:px-14 py-12">
      <StateMessage
        title="Carregando produto"
        description="Estamos buscando os detalhes, imagens e variações do produto."
      />
    </main>
  );
}
