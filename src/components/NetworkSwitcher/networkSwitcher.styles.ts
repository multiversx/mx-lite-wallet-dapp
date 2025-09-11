// prettier-ignore
export const styles = {
  networkTooltip: 'network-tooltip',
  networkTooltipTrigger: 'network-tooltip-trigger flex h-8 lg:h-10 cursor-pointer gap-1 lg:gap-2 items-center justify-center w-12 min-w-12 max-w-12 lg:min-w-16 lg:max-w-16 lg:w-16 relative after:absolute after:bg-btn-variant after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none after:rounded-xl after:duration-200 after:ease-out after:transition-all hover:after:opacity-100',
  networkTooltipTriggerIcon: 'network-tooltip-trigger-icon transition-all text-xs relative z-1 duration-200 ease-out text-tertiary',
  networkTooltipTriggerIconRotated: 'rotate-180',
  networkTooltipOptions: 'network-tooltip-options flex-col gap-1 flex',
  networkTooltipOption: 'network-tooltip-option w-full lg:w-60 flex p-3 flex group text-primary font-normal gap-3 items-center transition-all duration-200 ease-out cursor-pointer relative after:transition-all after:duration-200 after:ease-out after:absolute after:opacity-0 hover:after:opacity-40 after:left-0 after:right-0 after:bottom-0 after:top-0 after:bg-accent after:pointer-events-none after:rounded-lg',
  networkTooltipOptionActive: 'after:bg-accent after:opacity-100 !text-accent !font-medium transition-all duration-200 ease-out',
  networkTooltipOptionLabel: 'network-tooltip-option-label leading-none relative z-1 text-base',
  networkTooltipOptionArrow: 'network-tooltip-option-arrow ml-auto duration-200 transition-all ease-out opacity-0 text-link group-hover:opacity-100',
  networkTooltipSelectedLabel: 'text-primary z-1'
} satisfies Record<string, string>;
