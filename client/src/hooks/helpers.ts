import { ref } from 'vue';
const URL_SERVER = process.env.VUE_APP_URL;

function useInputType() {
  const showPass = ref<boolean>(false);

  const checkInputType = (inputPass: HTMLElement) => {
    if (inputPass instanceof HTMLInputElement) {
      if (inputPass.type === "password") {
        showPass.value = true;
        inputPass.type = "text";
      } else {
        showPass.value = false;
        inputPass.type = "password";
      }
    }
  }

  return [ showPass, checkInputType ]
}

function serverError(req: Response, res: { message: string }, messErr: string) {
  if (!req.ok) {
    const error = new Error(messErr) || res.message || 'Unknown error';
    throw error;
  }
};

async function handleRequest<T>
  (
    url: string | null = 'GET',
    method: string | null = null,
    token: string | null = null,
    payload: any,
    ContentType: string | null = 'json'
  ): Promise<[ Response, T ]> {

  const fetchOptions: RequestInit = {
    method: method !== null ? method : 'GET',
    headers: {},
  };

  if (token !== null) {
    if (!fetchOptions.headers) fetchOptions.headers = {};

    (fetchOptions.headers as Record<string, string>)[ 'Authorization' ] = `Bearer ${token}`;
  }

  if (payload !== null && ContentType === 'json') {
    (fetchOptions.headers as Record<string, string>)[ 'Content-Type' ] = 'application/json';
    fetchOptions.body = JSON.stringify(payload)
  }

  if (payload !== null && ContentType === 'html') fetchOptions.body = payload;

  const req = await fetch(`${URL_SERVER}${url}`, fetchOptions);
  const res = await req.json();

  return [ req, res ];
}

export { useInputType, serverError, handleRequest }
