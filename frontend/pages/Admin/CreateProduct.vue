<template>
	<div class="form-wrapper">
		<div class="form-header">
			<h2>Create Product</h2>
		</div>
		<el-form
			ref="ruleFormRef"
			style="max-width: 600px"
			label-position="top"
			:model="ruleForm"
			:rules="rules"
			class="ruleForm"
			status-icon
		>
			<el-form-item
				label="Product Title"
				prop="title"
			>
				<el-input v-model="ruleForm.title" />
			</el-form-item>
			<!-- <el-form-item
				label="Stock"
				prop="isInStock"
				label-position="right"
			>
				<el-switch v-model="ruleForm.isInStock" />
			</el-form-item> -->

			<!-- Dynamic fields for price and quantity -->
			<div
				v-for="(item, index) in ruleForm.items"
				:key="index"
				class="dynamic-field-group"
			>
				<el-form-item
					:label="`Quantity ${index + 1}`"
					:prop="`items.${index}.quantity`"
					:rules="rules.quantity"
				>
					<el-input
						v-model="item.quantity"
						:min="0"
						:precision="0"
					/>
				</el-form-item>
				<el-form-item
					:label="`Price ${index + 1}`"
					:prop="`items.${index}.price`"
					:rules="rules.price"
				>
					<el-input v-model.number="item.price" />
				</el-form-item>
				<el-button
					@click="removeDynamicField(index)"
					type="danger"
					size="small"
					:disabled="ruleForm.items.length === 1"
				>
					Remove
				</el-button>
			</div>

			<el-form-item>
				<el-button
					@click="addDynamicField"
					:disabled="ruleForm.items.length >= 4"
				>
					Add Price/Quantity
				</el-button>
			</el-form-item>

			<el-form-item
				label="Product Description"
				prop="desc"
			>
				<el-input
					v-model="ruleForm.desc"
					type="textarea"
				/>
			</el-form-item>
			<!-- TODO: Upload file to server -->
			<el-form-item label="Product Images">
				<el-upload
					list-type="picture-card"
					:auto-upload="false"
					v-model:file-list="fileList"
					:on-change="handleChange"
				>
					<el-icon><i class="ri-add-line"></i></el-icon>

					<template #file="{ file }">
						<div>
							<img
								class="el-upload-list__item-thumbnail"
								:src="file.url"
								alt=""
							/>
							<span class="el-upload-list__item-actions">
								<span
									class="el-upload-list__item-preview"
									@click="handlePictureCardPreview(file)"
								>
									<el-icon
										><i class="ri-zoom-in-line"></i
									></el-icon>
								</span>
								<span
									v-if="!disabled"
									class="el-upload-list__item-delete"
									@click="handleRemove(file)"
								>
									<el-icon
										><i class="ri-delete-bin-line"></i
									></el-icon>
								</span>
							</span>
						</div>
					</template>
				</el-upload>

				<el-dialog v-model="dialogVisible">
					<img
						:src="dialogImageUrl"
						alt="Preview Image"
						style="
							max-width: 100%;
							max-height: 80vh;
							object-fit: contain;
						"
					/>
				</el-dialog>
			</el-form-item>
			<el-form-item
				:style="{ display: 'flex', justifyContent: 'flex-end' }"
			>
				<el-button
					type="primary"
					@click="submitForm(ruleFormRef)"
				>
					Create
				</el-button>
				<el-button @click="resetForm(ruleFormRef)">Reset</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { useCreateProductStore } from '@/store/CreateProduct';

const { uploadFile, addProducts } = useCreateProductStore();
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const disabled = ref(false);
const fileList = ref([]);

definePageMeta({
	middleware: 'default',
});

const handleChange = async (file) => {
	console.log('File Name:', file.name, 'File Type', file.raw.type);
	try {
		await uploadFile(file);
		ElMessage.success('File uploaded successfully');
	} catch (error) {
		console.error('Upload failed:', error);
		ElMessage.error('Upload failed');
		options.onError();
	}
};

const handleRemove = (file) => {
	dialogImageUrl.value = '';
	const index = fileList.value.indexOf(file);
	if (index !== -1) {
		fileList.value.splice(index, 1);
	}
};

const handlePictureCardPreview = (file) => {
	dialogImageUrl.value = file.url;
	dialogVisible.value = true;
};

const ruleFormRef = ref();
const ruleForm = reactive({
	title: '',
	isInStock: true,
	desc: '',
	items: [{ price: 0, quantity: 0 }],
	images: [],
});

const rules = {
	title: [
		{
			required: true,
			message: 'Please input product title',
			trigger: 'blur',
		},
		{
			min: 3,
			max: 50,
			message: 'Length should be more than 3',
			trigger: 'blur',
		},
	],
	quantity: [
		{
			required: true,
			message: 'Please input quantity',
			trigger: 'blur',
		},
	],
	price: [
		{
			required: true,
			message: 'Please input price',
			trigger: 'blur',
		},
		{
			type: 'number',
			message: 'Price must be a number',
			trigger: ['blur'],
		},
	],
	desc: [
		{
			required: true,
			message: 'Please input product description',
			trigger: 'blur',
		},
	],
	images: [
		{
			required: true,
			validator: (rule, value, callback) => {
				if (fileList.value.length < 3) {
					callback(new Error('Please upload at least 3 images'));
				} else {
					callback();
				}
			},
			trigger: 'change',
		},
	],
};

const addDynamicField = () => {
	if (ruleForm.items.length < 4) {
		ruleForm.items.push({ price: 0, quantity: 0 });
	}
};

const removeDynamicField = (index) => {
	if (ruleForm.items.length > 1) {
		ruleForm.items.splice(index, 1);
	}
};

const submitForm = async (formEl) => {
	if (!formEl) return;
	await formEl.validate(async (valid, fields) => {
		if (valid) {
			// Format the form data
			const formattedData = {
				items: ruleForm.items.map((item) => ({
					price: Number(item.price),
					quantity: item.quantity,
					is_active: true,
				})),
				images: fileList.value.map((file, index) => ({
					image: file.name,
					is_thumbnail: index === 0, // Only true for the first image
				})),
				name: ruleForm.title,
				description: ruleForm.desc,
			};

			console.log('Formatted form data:', formattedData);

			try {
				// Call the addProducts function from the store
				await addProducts(formattedData);
				ElMessage.success('Product created successfully');
				// Optionally reset the form after successful submission
				resetForm(formEl);
			} catch (error) {
				console.error('Error creating product:', error);
				ElMessage.error('Failed to create product');
			}
		} else {
			console.log('Form validation failed:', fields);
			ElMessage.error('Please fill in all required fields correctly');
		}
	});
};

const resetForm = (formEl) => {
	if (!formEl) return;
	formEl.resetFields();
	ruleForm.items = [{ price: 0, quantity: 0 }];
	fileList.value = [];
};
</script>

<style scoped>
.form-wrapper {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 0 10% 0 10%;
	.dynamic-field-group {
		display: flex;
		align-items: flex-start;
		margin-bottom: 20px;
	}

	.dynamic-field-group .el-form-item {
		margin-right: 20px;
		margin-bottom: 0;
	}
}
</style>
