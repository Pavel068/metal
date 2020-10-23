<template>
	<div class="wrapper">
		<div class="card">
			<div class="card-header">Общие рекомендации</div>
			<div class="card-body">
				<p class="lead text-green">sdcsd</p>
				<p class="lead text-green"></p>
				<p class="lead text-green"></p>
			</div>
		</div>
		<div class="card mt-3">
			<div class="card-header">Журнал</div>
			<div class="card-body">
				<table class="table table-striped">
					<tr>
						<th>Гильза</th>
						<th>Неисправность</th>
						<th>Причина</th>
						<th>Рекомендация</th>
					</tr>
					<tr>
						<td>132132</td>
						<td>Поломка</td>
						<td>Перегрев</td>
						<td>Не перегревать</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Recommendation"
}
</script>

<style scoped>
	.text-green {
		color: #048f20;
	}
</style>