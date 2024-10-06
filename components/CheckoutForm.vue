<template>
	<el-dialog
		v-model="dialogVisible"
		title="Checkout Form"
		style="min-width: 300px"
	>
		<el-form
			:model="form"
			style="padding: 1rem"
			label-position="top"
			:rules="rules"
		>
			<el-form-item
				prop="contactNumber"
				label="Contact Number"
				label-width="auto"
			>
				<el-input
					v-model="form.contactNumber"
					placeholder="Contact Number"
				>
					<template #prepend>+91</template>
				</el-input>
			</el-form-item>
			<el-form-item
				prop="fullName"
				label="Full Name"
				label-width="auto"
			>
				<el-input
					v-model="form.fullName"
					placeholder="Full Name"
				/>
			</el-form-item>
			<el-form-item
				prop="pincode"
				label="Pincode"
				label-width="auto"
			>
				<el-input
					v-model="form.pincode"
					placeholder="Pincode"
				/>
			</el-form-item>
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item
						prop="state"
						label="State"
						label-width="auto"
					>
						<el-select
							v-model="form.state"
							placeholder="select state"
						>
							<el-option
								v-for="item in cartStore.statesList"
								:label="item.name"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item
						prop="city"
						label="City"
						label-width="auto"
					>
						<el-select
							v-model="form.city"
							placeholder="select city"
						>
							<el-option
								v-for="item in cartStore.cityList"
								:label="item.name"
								:value="item.id"
							/>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item
				label="Full Address"
				label-width="auto"
				prop="fullAddress"
			>
				<el-input
					v-model="form.fullAddress"
					:autosize="{ minRows: 2, maxRows: 4 }"
					type="textarea"
					placeholder="Full Address"
				/>
			</el-form-item>
			<el-row justify="end">
				<el-form-item>
					<el-button @click="dialogVisible = false">Cancel</el-button>
					<el-button
						type="primary"
						@click="onSubmit"
						>Confirm Order</el-button
					>
				</el-form-item>
			</el-row>
		</el-form>
	</el-dialog>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore';

const cartStore = useCartStore();
// const stateList = storeToRefs(cartStore, 'stateList');
// const cityList = storeToRefs(cartStore, 'cityList');

const props = defineProps({
	checkoutFormVisible: Boolean,
});
const emit = defineEmits(['update:checkoutFormVisible']);

onMounted(() => {
	cartStore.fetchStates();
	cartStore.fetchCity();
});

const dialogVisible = computed({
	get: () => props.checkoutFormVisible,
	set: (value) => emit('update:checkoutFormVisible', value),
});

const form = reactive({
	contactNumber: '',
	fullName: '',
	pincode: '',
	state: '',
	city: '',
	fullAddress: '',
});

const rules = reactive({
	contactNumber: [
		{
			required: true,
			message: 'Contact number required',
			trigger: 'blur',
		},
		{
			type: 'string',
			pattern: /^\d{10}$/,
			message: 'Enter a valid 10-digit contact number',
			trigger: 'change',
		},
	],
	/*email: [
		{
			required: true,
			message: 'Please input email address',
			trigger: 'blur',
		},
		{
			type: 'email',
			message: 'Please input valid email',
			trigger: ['blur', 'change'],
		},
	],*/
	fullName: [
		{
			required: true,
			message: 'Full Name required',
			trigger: 'blur',
		},
	],
	pincode: [
		{
			required: true,
			message: 'pincode required',
			trigger: 'blur',
		},
		{
			validator: (rule, value, callback) => {
				if (value && !/^[1-9]\d{5}$/.test(value)) {
					callback('PIN code cannot start from zero.');
				} else if (value && !/^\d{6}$/.test(value)) {
					callback('PIN code must be 6 digits long.');
				} else if (value && /^\d{3} \d{3}$/.test(value)) {
					callback('PIN code cannot have a space after 3 digits.');
				} else {
					callback();
				}
			},
			trigger: 'blur',
		},
	],
	state: [
		{
			required: true,
			message: 'state required',
			trigger: 'blur',
		},
	],
	district: [
		{
			required: true,
			message: 'district required',
			trigger: 'blur',
		},
	],
	fullAddress: [
		{
			required: true,
			message: 'Full address required',
			trigger: 'change',
		},
		{
			min: 20,
			max: 100,
			message: 'Enter a valid address',
			trigger: 'blur',
		},
	],
});

const onSubmit = () => {
	const formattedCartData = cartStore.cartList.map((item) => ({
		product: item.product,
		quantity: item.count,
		product_item: item.product_item_data.id,
	}));
	console.log('formatted cart data', cartStore.cartList);

	cartStore.confirmOrder({
		items: formattedCartData,
		name: form.fullName,
		pincode: form.pincode,
		mobile: form.contactNumber,
		address: form.fullAddress,
		state: form.state,
		city: form.city,
	});
	dialogVisible.value = false;
};
</script>

<style lang="scss"></style>
