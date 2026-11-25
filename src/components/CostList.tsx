import food from '../public/food.webp';
import gold from '../public/gold.webp';
import stone from '../public/stone.webp';
import wood from '../public/wood.webp';
import type { Cost, Resource } from '../types/techTypes';

const RESOURCE_ICONS: Record<Resource, string> = { food, wood, gold, stone };

/** "75 [food] 75 [wood]" - one span per resource, as the CSS expects. */
export default function CostList({ cost }: { cost: Cost[] }) {
  return (
    <>
      {cost.map((item, index) => (
        <span key={item.resource}>
          {item.amount} <img src={RESOURCE_ICONS[item.resource]} alt={item.resource} />
          {index < cost.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  );
}
