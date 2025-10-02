/* eslint-disable react/prop-types */
import { iconMap } from "../index.js";

export default function TechIcon({ name }) {
  const src = iconMap[name];
  
  if (!src) return <div className="missing-icon">{name}</div>;

  return <img src={src} alt={name} className="tech-icon" />;
}