<template>
  <div class="max-w-lg mx-auto my-16 lg:my-24">
    <div class="flex flex-col items-center gap-1 mb-8">
      <h1 class="text-xl tracking-s md:text-2xl">{{ $t('messages.account.loginToAccount') }}</h1>
      <div v-if="formView == 'login'" class="uppercase text-center">
        {{ $t('messages.account.noAccount') }}
        <NuxtLink class="underline hover:no-underline cursor-pointer text-black" @click="formView = 'register'">{{ $t('messages.account.accountRegister') }}</NuxtLink>
      </div>
      <div v-if="formView == 'register'" class="uppercase text-center">
        {{ $t('messages.account.hasAccount') }}
        <NuxtLink class="underline hover:no-underline cursor-pointer text-black" @click="formView = 'login'"
          >{{ $t('messages.account.accountLogin') }}</NuxtLink
        >
      </div>
    </div>

    <form class="grid gap-5" @submit.prevent="handleFormSubmit(userInfo)">
      <div>
        <label v-if="formView == 'register' || formView == 'forgotPassword'" for="email"
          >Email o Username <span class="text-red-500">*</span> <br />
          <input id="email" v-model="userInfo.email" placeholder="Email" type="text" required />
        </label>
        <p v-if="formView == 'forgotPassword'" class="mt-2 text-gray-500">{{ $t('messages.account.resetPassword') }}</p>
      </div>
      <div class="gap-5 grid" v-if="formView != 'forgotPassword'">
        <label for="username"
          >{{ $t('messages.account.username') }} <span class="text-red-500">*</span> <br />
          <input id="username" v-model="userInfo.username" placeholder="Username" type="text" required />
        </label>
        <label for="password"
          >{{ $t('messages.account.password') }} <span class="text-red-500">*</span> <br />
          <PasswordInput
            id="password"
            class="mt-1 border border p-2 h-9 rounded-none outline-none border-gray-300 w-full bg-white"
            v-model="userInfo.password"
            placeholder="Password"
            :required="true" />
        </label>
      </div>
      <Transition name="scale-y" mode="out-in">
        <div v-if="message" class="text-green-500" v-html="message"></div>
      </Transition>
      <Transition name="scale-y" mode="out-in">
        <div v-if="errorMessage" class="my-4 text-red-500" v-html="errorMessage"></div>
      </Transition>
      <button class="flex items-center justify-center gap-4 uppercase">
        <LoadingIcon v-if="isPending" stroke="4" size="16" color="#fff" />
        <span>{{ buttonText }}</span>
      </button>
    </form>
    <div class="uppercase my-5 text-center cursor-pointer" @click="formView = 'forgotPassword'" v-if="formView == 'login'">{{ $t('messages.account.forgetPassword') }}</div>
    <div class="uppercase my-5 text-center cursor-pointer" @click="formView = 'login'" v-if="formView == 'forgotPassword'">{{ $t('messages.account.backLogin') }}</div>
  </div>
</template>

<script setup>
const { t } = useI18n();
const { loginUser, isPending, registerUser, sendResetPasswordEmail } = useAuth();
const userInfo = ref({ email: '', password: '', username: '' });
const formView = ref('login');
const message = ref('');
const errorMessage = ref('');

const login = async (userInfo) => {
  const { success, error } = await loginUser(userInfo);
  switch (error) {
    case 'invalid_username':
      errorMessage.value = t('messages.error.invalidUsername');
      break;
    case 'incorrect_password':
      errorMessage.value = t('messages.error.incorrectPassword');
      break;
    default:
      errorMessage.value = error;
      break;
  }

  if (success) {
    errorMessage.value = '';
    message.value = t('messages.account.loggingIn');
  }
};

const handleFormSubmit = async (userInfo) => {
  if (formView.value === 'register') {
    const { success, error } = await registerUser(userInfo);
    if (success) {
      errorMessage.value = '';
      message.value = t('messages.account.accountCreated') + ' ' + t('messages.account.loggingIn');
      setTimeout(() => {
        login(userInfo);
      }, 2000);
    } else {
      errorMessage.value = error;
    }
  } else if (formView.value === 'forgotPassword') {
    resetPassword(userInfo);
  } else {
    login(userInfo);
  }
};

const resetPassword = async (userInfo) => {
  const { success, error } = await sendResetPasswordEmail(userInfo.email);
  if (success) {
    errorMessage.value = '';
    message.value = 'Se il tuo indirizzo email è registrato da noi, riceverai una email con un link per reimpostare la password.';
  } else {
    errorMessage.value = error;
  }
};

const buttonText = computed(() => {
  if (formView.value === 'login') {
    return t('messages.account.login');
  } else if (formView.value === 'register') {
    return t('messages.account.register');
  } else if (formView.value === 'forgotPassword') {
    return t('messages.account.sendPasswordResetEmail');
  }
  return 'login';
});
</script>

<style lang="postcss" scoped>
label {
  @apply uppercase;
}

input,
button {
  @apply mt-1 border p-2 h-9 rounded-none outline-none border-gray-300 w-full bg-white;
}

form button {
  @apply mt-5 bg-black hover:bg-white hover:text-black border border-black text-white p-2 md:p-1.5;
}

.tracking-s {
  letter-spacing: -0.015em;
}
</style>
