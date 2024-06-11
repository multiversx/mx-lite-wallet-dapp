import { LayoutsEnum } from '../types/layouts.enum';
import { ModalLayout } from '../ModalLayout';
import { NavbarLayout } from '../NavbarLayout';

export const getLayoutMap = (): Record<LayoutsEnum, typeof ModalLayout> => ({
  [LayoutsEnum.navbar]: NavbarLayout,
  [LayoutsEnum.modal]: ModalLayout
});
