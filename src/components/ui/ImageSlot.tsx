"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type ImageSlotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Imagem acima da dobra: sem lazy e com prioridade alta */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Slot de imagem: contêiner com placeholder elegante (degradê quente + grão),
 * <img> com lazy/decoding e overlay escuro. Se o arquivo não existir,
 * a imagem é removida e o placeholder continua bonito.
 */
export function ImageSlot({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  style,
}: ImageSlotProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);

  // Cobre o erro que acontece antes da hidratação
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={`slot ${className}`.trim()} style={style}>
      {!failed && (
        <picture>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            className="slot__img"
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            onError={() => setFailed(true)}
          />
        </picture>
      )}
    </div>
  );
}
