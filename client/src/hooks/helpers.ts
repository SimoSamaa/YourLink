import { Ref, ref, computed } from 'vue';
import { Theme } from '@/types/interfacesTheme';

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

  return [ showPass, checkInputType ];
};

interface CopyLinkHookResult {
  copyLink: (username: string) => void;
  alert: Ref<boolean>;
};

function useCopyLink(): CopyLinkHookResult {
  const alert = ref<boolean>(false);
  let alertTime: number | NodeJS.Timeout;

  const copyLink = (username: string) => {
    const url = `${window.location.origin}/${username}`;
    const input = document.createElement("input");
    input.setAttribute("value", url);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    alert.value = true;
    clearTimeout(alertTime);
    alertTime = setTimeout(() => alert.value = false, 2000);
  };

  return { copyLink, alert };
};

function linkTheme() {
  const linkStyle = computed(() => {
    return (theme: Theme) => {
      return [
        theme.link?.startsWith('link') ? '' :
          {
            backgroundColor: theme.link?.endsWith('line') ? '' : theme.linkClr,
            border: `1px solid ${theme.link?.endsWith('hard') ? theme.shadowlinkClr : theme.linkClr}`,
            color: theme.fontLinkClr,
            boxShadow:
              theme.link?.endsWith('hard') ? '4px 4px 0 0 ' +
                theme.shadowlinkClr : theme.link?.endsWith('soft') ? '0 4px 4px 0 ' + theme.shadowlinkClr : '',
          }
      ]
    }
  });

  return linkStyle;
};

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

export { useInputType, serverError, handleRequest, linkTheme, useCopyLink };
