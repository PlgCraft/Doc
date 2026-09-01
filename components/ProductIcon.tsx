import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders a product's `icon`. Most products use a plain emoji here, but a
 * product can instead point `icon` at a real logo file under `/public`
 * (e.g. "/products/openfeed/logo.png") and it renders as an image instead.
 */
export function ProductIcon({
  icon,
  name,
  textSizeClass,
  pixelSize,
  className,
}: {
  icon: string;
  name: string;
  textSizeClass: string;
  pixelSize: number;
  className?: string;
}) {
  return (
    <div className="bg-white rounded-2xl" style={{ width: pixelSize }}>
      {icon.startsWith("/") ? (<Image
        src={icon}
        alt={`${name} logo`}
        width={pixelSize}
        height={pixelSize}
        style={{ width: pixelSize, height: pixelSize }}
        className={cn("object-contain", className)}
      />
      ) : (<div className={cn(textSizeClass, className)}>{icon}</div>)}
    </div>
  );

}
