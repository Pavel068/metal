<template>
	<div class="card">
		<div class="card-header">Загрузка данных</div>
		<div class="card-body">
			<form class="row form-group file-upload" multiple="true" enctype="multipart/form-data">
				<label for="files">Выберите файлы</label>
				<input type="file" name="files" id="files">
			</form>
			<div class="row form-group">
				<button class="btn btn-success">Загрузить</button>
			</div>
		</div>
	</div>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker';

export default {
	name: "Index",
	components: {DateRangePicker},
	data() {
		return {
			dateRange: null
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