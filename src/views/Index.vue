<template>
	<div class="row">
		<div class="col-md-6">
			<div class="card">
				<div class="card-header">Загружено</div>
				<div class="card-body">
					<div v-if="loading">Загрузка данных ...</div>
					<div v-else>
						<div v-if="file_data">
							<div v-if="file_data.error">
								<p class="lead">{{file_data.message}}</p>
							</div>
							<div v-else>
								<table class="table table-striped">
									<tr>
										<th>Выборка</th>
										<td>{{file_data.name}}</td>
									</tr>
									<tr>
										<th>Анализируемые параметры</th>
										<td>{{Object.values(file_data.fields).join(', ')}}</td>
									</tr>
									<tr>
										<th>Количество плавок</th>
										<td>{{file_data.data.length}}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-6">
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
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "Index",
	data() {
		return {
			file_data: null,
			loading: false,
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

			await this.loadData();
		},
		async loadData() {
			this.loading = true;
			this.file_data = (await axios.get(this.env.VUE_APP_API + '/api/parse')).data.data;
			this.loading = false;
		},
	},
	async mounted() {
		await this.loadData();
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