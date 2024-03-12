import { ref } from 'vue';

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

export { useInputType }
