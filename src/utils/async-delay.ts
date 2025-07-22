import { logColor } from './log-color';

export async function asyncDelay(
  ms: number = 0,
  verbose = false,
): Promise<void> {
  if (ms <= 0) return;
  if (verbose) {
    logColor(`Delaying for ${ms} milliseconds`, Date.now());
  }

  await new Promise(resolve => setTimeout(resolve, ms));
}
