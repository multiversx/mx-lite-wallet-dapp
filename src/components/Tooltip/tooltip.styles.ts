// prettier-ignore
export const styles = {
  tooltipWrapper: 'tooltip-wrapper relative',
  tooltipDrawer: 'tooltip-drawer md:hidden',
  tooltip: 'tooltip bg-primary! border! border-secondary! z-1 rounded-xl! p-0! visible! pointer-events-all! before:absolute before:inset-0 before:bg-primary before:rounded-xl before:z-1',
  tooltipMobile: 'tooltip-mobile hidden md:flex!',
  tooltipContent: 'tooltip-content p-2 leading-tight text-neutral-500 text-xs text-center z-2 relative',
  tooltipArrow: 'tooltip-arrow bg-primary! border! border-secondary! w-2! h-2!',
  tooltipTrigger: 'tooltip-trigger'
} satisfies Record<string, string>;
