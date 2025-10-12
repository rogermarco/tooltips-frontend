/* eslint-disable react/prop-types */
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip.jsx";
import { memo } from "react";
import cross from "../assets/techtree/cross.png";

export const TechIcon = memo(function TechIcon({ data, name }) {
  return (
    <div className="tech-icon-wrapper">
      <Tooltip>
        <TooltipTrigger asChild>
          <div style={{ position: "relative" }}>
            <img
              src={data.icon}
              alt={name}
              className={`tech-icon ${data.disabled ? "disabled" : ""}`}
            />
            {data.disabled && (
              <img
                src={cross}
                alt="disabled"
                className="disabled-icon-overlay"
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="tech-tree-tooltip">{name}</div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
});