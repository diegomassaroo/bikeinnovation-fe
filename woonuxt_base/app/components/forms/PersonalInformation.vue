<template>
  <form v-if="customer" class="mt-12" @submit.prevent="saveChanges">
    <div class="grid gap-5 p-2 md:p-1.5 md:grid-cols-2 personal-form">
      <p class="text-xl md:text-2xl tracking-s col-span-full">{{ $t('messages.account.personalInfo') }}</p>

      <div class="w-full">
        <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
        <input v-model="customer.firstName" placeholder="Nome" type="text" />
      </div>

      <div class="w-full">
        <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
        <input v-model="customer.lastName" placeholder="Cognome" type="text" />
      </div>
      <div class="w-full col-span-full">
        <label for="email">{{ $t('messages.billing.email') }}</label>
        <input v-model="customer.email" placeholder="Email" type="email" />
      </div>
    </div>
    <div class="bg-white bg-opacity-75 col-span-full p-2 md:p-1.5 mt-6 sticky bottom-0">
      <button
        class="flex bg-black hover:bg-white hover:text-black w-full border border-black ml-auto text-white p-2 md:p-1.5 h-9 gap-4 items-center text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        :disabled="loading">
        <LoadingIcon v-if="loading" color="#fff" size="20" />
        <span class="w-full uppercase">{{ button.text }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const { viewer, customer } = useAuth();
const { t } = useI18n();

const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({ text: t('messages.account.updateDetails'), color: 'bg-primary hover:bg-primary-dark' });

async function saveChanges() {
  loading.value = true;
  button.value.text = t('messages.account.updating');
  const firstName = customer.value.firstName;
  const lastName = customer.value.lastName;
  try {
    const { updateCustomer } = await GqlUpdateCustomer({ input: { id: viewer.value.id, firstName, lastName } });
    if (updateCustomer) button.value = { text: t('messages.account.updateSuccess'), color: 'bg-green-500' };
  } catch (error) {
    button.value = { text: t('messages.account.failed'), color: 'bg-red-500' };
  }

  loading.value = false;

  setTimeout(() => {
    button.value = { text: t('messages.account.updateDetails'), color: 'bg-primary hover:bg-primary-dark' };
  }, 2000);
}
</script>

<style lang="postcss" scoped>
.personal-form input[type='text'],
.personal-form input[type='email'] {
  @apply bg-white border-b h-9 rounded-none outline-none border-gray-300 w-full p-2;
}

.tracking-s {
  letter-spacing: -0.015em;
}
</style>