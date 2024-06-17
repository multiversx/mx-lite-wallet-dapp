export const getIsReload = () => {
  const { type: pageActionType } = window.performance.getEntriesByType(
    'navigation'
  )[0] as PerformanceNavigationTiming;

  return pageActionType === 'reload';
};
