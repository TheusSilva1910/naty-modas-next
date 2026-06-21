import { sizeChart } from "@/data/size-chart";

/** Tabela de medidas reaproveitada na PDP. */
export function SizeTable() {
  return (
    <div id="medidas">
      <div className="text-[11px] tracking-[0.28em] text-naty-gold uppercase">
        Guia de medidas
      </div>
      <h3 className="font-display text-[24px] md:text-[28px] text-naty-text mt-2.5 mb-5 font-medium">
        Tabela de Medidas
      </h3>
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="bg-white">
            {["Tamanho", "Busto", "Cintura", "Quadril", "Comprimento"].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3.5 font-medium tracking-[0.12em] text-[11px] text-naty-muted uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeChart.map((row) => (
            <tr
              key={row.size}
              className="bg-white border-t border-naty-blush"
            >
              <td className="px-4 py-3.5 font-medium">{row.size}</td>
              <td className="px-4 py-3.5">{row.bust}</td>
              <td className="px-4 py-3.5">{row.waist}</td>
              <td className="px-4 py-3.5">{row.hip}</td>
              <td className="px-4 py-3.5">{row.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-[11px] text-naty-muted mt-3.5">
        Medidas em centímetros. Tolerância de ±2cm.
      </div>
    </div>
  );
}
