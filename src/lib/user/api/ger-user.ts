import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { PublicUserDto, PublicUserSchema } from '../schemas';

export async function getUserFromApi() {
  const userResponse = await authenticatedApiRequest<PublicUserDto>(
    '/user/me',
    {
      next: {
        tags: ['user'],
        revalidate: 86400,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!userResponse.success) {
    return null;
  }

  return PublicUserSchema.parse(userResponse.data);
}
