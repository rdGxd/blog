import { asyncDelay } from './async-delay';

export async function verifyHoneypotInput(formData: FormData, delay = 3000) {
  await asyncDelay(delay);

  const niceInputValue = formData.get('dateUpdatedAt');

  const isBot =
    niceInputValue === null ||
    (typeof niceInputValue === 'string' && niceInputValue.trim() !== '');

  return isBot;
}
