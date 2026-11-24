import type { Icon } from "@phosphor-icons/react";

export function StateIcon({
  icon: Glyph,
  size = 16,
  className,
  activeWeight = "fill",
}: {
  icon: Icon;
  size?: number;
  className?: string;
  activeWeight?: "fill" | "bold";
}) {
  return (
    <span className={className ? `state-icon ${className}` : "state-icon"} aria-hidden="true">
      <Glyph size={size} weight="regular" className="state-icon-outline" />
      <Glyph size={size} weight={activeWeight} className="state-icon-fill" />
    </span>
  );
}
