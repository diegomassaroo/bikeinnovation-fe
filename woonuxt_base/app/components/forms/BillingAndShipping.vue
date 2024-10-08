<template>
  <form class="bg-white" @submit.prevent="saveChanges">
    <div class="grid p-2 md:p-1.5 gap-5 md:grid-cols-2 personal-form">
      <h3 class="text-xl md:text-2xl tracking-s col-span-full">{{ $t('messages.billing.billing') }}</h3>

      <div class="w-full">
        <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
        <input v-model="customer.billing.firstName" placeholder="Nome" type="text" required />
      </div>

      <div class="w-full">
        <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
        <input v-model="customer.billing.lastName" placeholder="Cognome" type="text" required />
      </div>

      <div class="w-full">
        <label for="billing-phone">{{ $t('messages.billing.phone') }}</label>
        <input v-model="customer.billing.phone" type="tel" />
      </div>

      <div class="w-full">
        <label for="billing-company">{{ $t('messages.billing.company') }}</label>
        <input v-model="customer.billing.company" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-address">{{ $t('messages.billing.address1') }}</label>
        <input v-model="customer.billing.address1" placeholder="Indirizzo" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-address-2">{{ $t('messages.billing.address2') }}</label>
        <input v-model="customer.billing.address2" placeholder="Appartamento, studio, piano" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-city">{{ $t('messages.billing.city') }}</label>
        <input v-model="customer.billing.city" placeholder="Città" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-state">{{ $t('messages.billing.state') }}</label>
        <LazyStateSelect v-model="customer.billing.state" :default-value="customer.billing.state" :country-code="customer.billing.country" />
      </div>

      <div class="w-full">
        <label for="country">{{ $t('messages.billing.country') }}</label>
        <CountrySelect v-model="customer.billing.country" :default-value="customer.billing.country" />
      </div>

      <div class="w-full">
        <label for="billing-zip">{{ $t('messages.billing.zip') }}</label>
        <input v-model="customer.billing.postcode" placeholder="CAP" type="text" />
      </div>

      <div class="w-full col-span-full">
        <label for="email">{{ $t('messages.billing.email') }}</label>
        <input v-model="customer.billing.email" placeholder="Email" type="email" required />
      </div>
    </div>

    <div class="grid p-2 md:p-1.5 gap-5 mt-12 md:grid-cols-2 personal-form">
      <h3 class="font-semibold text-xl md:text-2xl tracking-s col-span-full">{{ $t('messages.general.shipping') }}</h3>

      <div class="w-full">
        <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
        <input v-model="customer.shipping.firstName" placeholder="Nome" type="text" required />
      </div>

      <div class="w-full">
        <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
        <input v-model="customer.shipping.lastName" placeholder="Cognome" type="text" required />
      </div>

      <div class="w-full">
        <label for="billing-phone">{{ $t('messages.billing.phone') }}</label>
        <input v-model="customer.shipping.phone" type="tel" />
      </div>

      <div class="w-full">
        <label for="billing-company">{{ $t('messages.billing.company') }}</label>
        <input v-model="customer.shipping.company" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-address">{{ $t('messages.billing.address1') }}</label>
        <input v-model="customer.shipping.address1" placeholder="Indirizzo" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-address-2">{{ $t('messages.billing.address2') }}</label>
        <input v-model="customer.shipping.address2" placeholder="Appartamento, studio, piano" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-city">{{ $t('messages.billing.city') }}</label>
        <input v-model="customer.shipping.city" placeholder="Città" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-state">{{ $t('messages.billing.state') }}</label>
        <StateSelect v-model="customer.shipping.state" :default-value="customer.shipping.state" :country-code="customer.shipping.country" />
      </div>

      <div class="w-full">
        <label for="country">{{ $t('messages.billing.country') }}</label>
        <CountrySelect v-model="customer.shipping.country" :default-value="customer.shipping?.country" />
      </div>

      <div class="w-full">
        <label for="billing-zip">{{ $t('messages.billing.zip') }}</label>
        <input v-model="customer.shipping.postcode" placeholder="CAP" type="text" />
      </div>
    </div>

    <div class="bg-white col-span-full p-2 md:p-1.5 mt-6 sticky bottom-0 ">
      <button
        class="flex bg-black ml-auto hover:bg-white hover:text-black w-full border border-black text-white p-2 md:p-1.5 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
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

async function saveChanges(): Promise<void> {
  loading.value = true;
  button.value.text = t('messages.account.updating');
  const shipping = customer.value.shipping;
  const billing = customer.value.billing;

  try {
    const { updateCustomer } = await GqlUpdateCustomer({ input: { id: viewer.value.id, shipping, billing } });
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
.personal-form input[type='tel'],
.personal-form input[type='email'] {
  @apply bg-white border-b h-9 rounded-none outline-none border-gray-300 w-full p-2;
}

.tracking-s {
  letter-spacing: -0.015em;
}
</style>