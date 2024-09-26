<script setup lang="ts">
const { cart, isUpdatingCoupon, applyCoupon, removeCoupon } = useCart();
const couponCode = ref<string>('');
const errorMessage = ref<string>('');

async function submitCoupon(): Promise<void> {
  const { message } = await applyCoupon(couponCode.value);
  if (message) {
    errorMessage.value = message;
  } else {
    couponCode.value = '';
    errorMessage.value = '';
  }
}
</script>

<template>
  <div>
    <form class="flex -space-x-px" @submit.prevent="submitCoupon">
      <input
        id="couponCode"
        v-model="couponCode"
        type="text"
        :placeholder="$t('messages.shop.couponCode')"
        class="w-full p-2 bg-white border border-gray-300 outline-none h-9"
        required />
      <button class="uppercase flex items-center justify-center p-2 text-white bg-black border border-black outline-none min-w-20 h-9" :disabled="isUpdatingCoupon">
        <LoadingIcon v-if="isUpdatingCoupon" color="#fff" size="16" />
        <span v-else>{{ $t('messages.general.apply') }}</span>
      </button>
    </form>
    <Transition name="scale-y" mode="out-in">
      <div v-if="errorMessage" class="mt-2 text-red-600" v-html="errorMessage"></div>
    </Transition>
    <Transition name="scale-y" mode="out-in">
      <div v-if="cart && cart.appliedCoupons" class="uppercase flex flex-wrap gap-5">
        <div v-for="(coupon, index) in cart.appliedCoupons" :key="coupon?.code || index" class="flex flex-wrap mt-2 flex-2">
          <div v-if="coupon?.code" class="bg-white border-black border flex bg-opacity-5 text-black leading-none p-2 gap-1.5 h-9 items-center">
            <span v-html="coupon.code" />
            <!-- <Icon name="ion:close" class="cursor-pointer" @click="removeCoupon(coupon.code)" /> -->
            <NuxtLink name="ion:close" class="cursor-pointer" @click="removeCoupon(coupon.code)"></NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
