"use client";

import { useState } from "react";

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("Selecione uma nota"); return; }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, comment: comment.trim() || undefined }),
      });
      const data = await res.json() as { success: boolean; error?: string };

      if (!data.success) {
        setError(data.error ?? "Erro ao enviar avaliação");
      } else {
        setSuccess(true);
        onSuccess?.();
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 p-5 text-[13px] text-green-800">
        Obrigada pela avaliação! Sua opinião é muito importante para nós.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <p className="text-[11px] tracking-[0.2em] text-naty-muted uppercase mb-2">Sua nota</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className={`text-[24px] transition-colors ${
                star <= (hover || rating) ? "text-naty-gold" : "text-naty-line"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[11px] tracking-[0.2em] text-naty-muted uppercase mb-2">
          Comentário (opcional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Conta como foi sua experiência com a peça..."
          className="w-full border border-naty-line bg-white px-3.5 py-3 text-[13px] outline-none focus:border-naty-rose-deep transition-colors resize-none"
        />
      </div>

      {error && <p className="text-[12px] text-red-500">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary self-start disabled:opacity-60">
        {loading ? "Enviando..." : "Enviar avaliação"}
      </button>
    </form>
  );
}
