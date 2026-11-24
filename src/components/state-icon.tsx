import type { ComponentType } from "react";
import type { IconProps } from "@tabler/icons-react";

type TablerIcon = ComponentType<IconProps>;

export function StateIcon({
  icon: OutlineIcon,
  filledIcon: FilledIcon,
  size = 16,
  stroke = 1.75,
  activeStroke = 2.4,
  className,
}: {
  icon: TablerIcon;
  filledIcon?: TablerIcon;
  size?: number;
  stroke?: number;
  activeStroke?: number;
  className?: string;
}) {
  return (
    <span className={className ? `state-icon ${className}` : "state-icon"} aria-hidden="true">
      <OutlineIcon size={size} stroke={stroke} className="state-icon-outline" />
      {FilledIcon ? (
        <FilledIcon size={size} className="state-icon-fill" />
      ) : (
        <OutlineIcon size={size} stroke={activeStroke} className="state-icon-fill" />
      )}
    </span>
  );
}
