<template>
  <form class="bg-white" @submit.prevent="updatePassword">
    <div class="grid p-2 md:p-1.5 gap-5 md:grid-cols-2 personal-form">
      <h3 class="text-xl md:text-2xl tracking-s col-span-full">{{ $t('messages.account.changePassword') }}</h3>

      <input v-model="viewer.username" type="hidden" />

      <div class="w-full">
        <label for="new-password">{{ $t('messages.account.newPassword') }}</label>
        <input v-model="password.new" placeholder="••••••••••" type="text" required />
      </div>

      <div class="w-full">
        <label for="new-password-confirm">{{ $t('messages.account.confirmNewPassword') }}</label>
        <input v-model="password.confirm" placeholder="••••••••••" type="text" required />
      </div>

      <Transition name="scale-y" mode="out-in">
        <div v-if="errorMessage" class="w-full text-red-500" v-html="errorMessage"></div>
      </Transition>
    </div>

    <div class="bg-white col-span-full p-2 md:p-1.5 mt-6 sticky bottom-0">
      <button
        class="flex bg-black ml-auto text-white hover:bg-white hover:text-black w-full border border-black p-2 md:p-1.5 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="loading">
        <LoadingIcon v-if="loading" color="#fff" size="20" />
        <span class="w-full uppercase">{{ button.text }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const { viewer, loginUser } = useAuth();
const { t } = useI18n();

const password = ref<{ new: string; confirm: string }>({ new: '', confirm: '' });
const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({ text: t('messages.account.updatePassword'), color: 'bg-primary hover:bg-primary-dark' });
const errorMessage = ref<string>('');

const updatePassword = async () => {
  errorMessage.value = '';
  if (password.value.new !== password.value.confirm) {
    errorMessage.value = 'Passwords do not match. Please try again.';
    return;
  }

  try {
    loading.value = true;
    const { updateCustomer } = await GqlUpdateCustomer({ input: { id: viewer.value.id, password: password.value.new } });
    if (updateCustomer) {
      button.value = { text: t('messages.account.updateSuccess'), color: 'bg-green-500' };
      const { success, error } = await loginUser({ username: viewer.value.username, password: password.value.new });
      if (error) {
        errorMessage.value = error;
        button.value = { text: t('messages.account.failed'), color: 'bg-red-500' };
      }
      if (success) {
        password.value = { new: '', confirm: '' };
      }
    }
  } catch (error) {
    console.error(error);
    const gqlError = error?.gqlErrors?.[0]?.message;
    errorMessage.value = gqlError || 'An error occurred. Please try again.';
    button.value = { text: t('messages.account.failed'), color: 'bg-red-500' };
  }

  loading.value = false;

  setTimeout(() => {
    button.value = { text: t('messages.account.updatePassword'), color: 'bg-primary hover:bg-primary-dark' };
  }, 2000);
};
</script>

<style lang="postcss" scoped>
.personal-form input[type='text'],
.personal-form input[type='tel'],
.personal-form input[type='email'] {
  @apply bg-white border-b h-9 rounded-none outline-none border-gray-300 w-full p-2;
}

.tracking-s {
  letter-spacing: -0.015em;
}
</style>