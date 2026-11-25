interface ArrowButtonProps {
  direction: 'left' | 'right';
  icon: string;
  label: string;
  onClick: () => void;
  /** At the first/last page. Uses aria-disabled rather than `disabled` so
   *  hover events still reach the tooltip and keep it open. */
  atEnd?: boolean;
}

export default function ArrowButton({ direction, icon, label, onClick, atEnd = false }: ArrowButtonProps) {
  return (
    <button
      type='button'
      className={`tooltip-arrow tooltip-arrow-${direction}`}
      aria-label={label}
      aria-disabled={atEnd}
      onClick={atEnd ? undefined : onClick}
    >
      <img src={icon} alt='' />
    </button>
  );
}
