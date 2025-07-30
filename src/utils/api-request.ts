type ApiRequestError = {
  errors: string[];
  status: number;
  success: false;
};

type ApiRequestSuccess<T> = {
  data: T;
  status: number;
  success: true;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;
export const apiUrl = `${process.env.API_URL}` || 'http://localhost:3001';

export async function apiRequest<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const url = `${apiUrl}${path}`;

  try {
    const res = await fetch(url, options);
    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const errors = Array.isArray(json?.message)
        ? json.message
        : [json?.message || 'Erro desconhecido'];

      return {
        errors,
        status: res.status,
        success: false,
      };
    }

    return {
      data: json,
      status: res.status,
      success: true,
    };
  } catch (error) {
    console.log('Erro na requisição:', error);
    return {
      errors: ['Falha ao conectar com o servidor'],
      status: 500,
      success: false,
    };
  }
}
