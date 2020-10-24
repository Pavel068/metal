<template>
	<div class="card">
		<div class="card-header">Рассчетная часть</div>
		<div class="card-body">
			<p>Выборка: <strong>Отчет о параметрах МНЛЗ с 01.07.2020 по 01.10.2020</strong></p>
			<p>Время расчета: <strong>{{time}}</strong></p>
			<p>Ожидаемая дата поломки: </p>
			<table class="table table-striped">
				<tr>
					<th>Гильза</th>
					<th>Дата</th>
				</tr>
				<tr>
					<td>165168</td>
					<td>05.11.2020</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>

export default {
	name: "Calculations",
	data() {
		return {

		}
	},
	computed: {
		env() {
			return process.env;
		},
		time() {
			return (new Date).toString("dd.MM.yyyy HH:mm:ss");
		}
	},
	methods: {

	},
	async mounted() {

	}
}
</script>

<style scoped>

</style>