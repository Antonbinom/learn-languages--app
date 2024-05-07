/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject } from 'vue';

export default function useAppEventBus() {
  const bus: any = inject('bus');
  const $on = (...args: any) => bus.on(...args);
  const $once = (...args: any) => bus.once(...args);
  const $off = (...args: any) => bus.off(...args);
  const $emit = (...args: any) => bus.emit(...args);
  return { $on, $once, $off, $emit };
}
