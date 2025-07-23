'use server';

import { logColor } from '@/utils/log-color';

export async function deletePostAction(formData: FormData) {
  const id = formData.get('id');
  logColor(`Deleting post with ID: ${id}`, 'red');
}
