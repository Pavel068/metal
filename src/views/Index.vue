<template>
	<div class="card">
		<div class="card-header">Загрузка данных</div>
		<div class="card-body">
			<form class="row form-group file-upload">
				<label for="files">Выберите файлы</label>
				<input type="file" name="files" id="files" ref="files" multiple>
			</form>
			<div class="row form-group">
				<button class="btn btn-success" @click="uploadFile" :disabled="uploading">Загрузить</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "Index",
	data() {
		return {
			uploading: false,
			files: null
		}
	},
	computed: {
		env() {
			return process.env;
		}
	},
	methods: {
		async uploadFile() {
			this.uploading = true;
			let formData = new FormData();

			const files = document.querySelector('#files');
			files.files.forEach(file => {
				formData.append('files', file);
			});

			await axios.post(this.env.VUE_APP_API + '/api/upload', formData, {
				headers: {'Content-Type': 'multipart/form-data'}
			});

			files.value = "";
			this.uploading = false;
		}
	}
}
</script>

<style scoped>
.row.form-group {
	margin-left: 0;
}

.file-upload > *:not(:first-child) {
	margin-left: 10px;
}
</style>