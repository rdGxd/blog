'use server';

import { logColor } from '@/utils/log-color';

export async function deletePostAction(id: string) {
  logColor(`Deleting post with ID: ${id}`, 'red');
  return id;
}
