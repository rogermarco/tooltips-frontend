/* eslint-disable react/prop-types */
import { Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip.jsx";
import { memo } from "react";
import cross from "../assets/techtree/cross.png";
import food from '../public/food.png';
import gold from '../public/gold.png';
import wood from '../public/wood.png';
import stone from '../public/stone.png';
import { prettifyText } from "../hooks/helpers";

const images = {
  food,
  wood,
  gold,
  stone
};

export const TechIcon = memo(function TechIcon({ data, name, type }) {

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
          <div className={`tech-tree-tooltip-${type}`}>
            <div className="tech-tree-tooltip-name">
              {name == "man-at-arms" ? "Man-at-Arms" : 
              name == "two-handed-swordsman" ? "Two-handed Swordsman" : 
              prettifyText(name)}</div>
            <div className="tech-tree-tooltip-cost">
              {data.cost.map((item, index) => (
                <span key={index}>
                  {item.amount} <img src={images[item.resource]} alt={item.resource} />
                  {index < data.cost.length - 1 ? " " : ""}
                </span>
              ))}
            </div>
            <p className='tech-tree-tooltip-text'>{data.desc}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
});