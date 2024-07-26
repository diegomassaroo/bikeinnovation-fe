<script setup>
const { allowedCountries } = await GqlGetStates({ country: 'IE' });
const { updateShippingLocation } = useCheckout();
const props = defineProps({
  modelValue: { type: Object, required: true },
  sameAsShippingAddress: { type: Boolean, default: true },
});

const billing = toRef(props, 'modelValue');
</script>

<template>
  <div class="grid w-full gap-5 lg:grid-cols-2 personal-form">
    <div class="w-full">
      <label for="first-name">{{ $t('messages.billing.firstName') }}</label>
      <input v-model="billing.firstName" placeholder="Nome" type="text" required />
    </div>

    <div class="w-full">
      <label for="last-name">{{ $t('messages.billing.lastName') }}</label>
      <input v-model="billing.lastName" placeholder="Cognome" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <label for="address1">{{ $t('messages.billing.address1') }}</label>
      <input v-model="billing.address1" placeholder="Indirizzo" type="text" required />
    </div>

    <div class="w-full col-span-full">
      <label for="address2">{{ $t('messages.billing.address2') }}</label>
      <input v-model="billing.address2" placeholder="Appartamento, studio, piano" type="text" />
    </div>

    <div class="w-full">
      <label for="city">{{ $t('messages.billing.city') }}</label>
      <input v-model="billing.city" placeholder="Città" type="text" required />
    </div>

    <div class="w-full">
      <label for="state">{{ $t('messages.billing.state') }}</label>
      <StateSelect v-model="billing.state" :default-value="billing.state" :country-code="billing.country" @change="updateShippingLocation" />
    </div>

    <div class="w-full">
      <label for="country">{{ $t('messages.billing.country') }}</label>
      <CountrySelect v-model="billing.country" :default-value="billing.country" @change="updateShippingLocation" />
    </div>

    <div class="w-full">
      <label for="zip">{{ $t('messages.billing.zip') }}</label>
      <input v-model="billing.postcode" placeholder="CAP" type="text" />
    </div>

    <div class="w-full col-span-full">
      <label for="phone">{{ $t('messages.billing.phone') }} ({{ $t('messages.general.optional') }})</label>
      <input v-model="billing.phone" placeholder="Telefono" type="tel" />
    </div>
  </div>
</template>
