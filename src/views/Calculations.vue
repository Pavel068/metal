<template>
	<div class="card">
		<div class="card-header">Рассчетная часть</div>
		<div class="card-body">
			<div class="card-header">Легенда</div>
			<div class="card-body">
				<table class="table table-striped">
					<tr>
						<th>Диапазон</th>
						<th>Решение</th>
					</tr>
					<tr style="background-color: green">
						<td>8</td>
						<td>Низкий уровень угрозы отказа/ поломки</td>
					</tr>
					<tr style="background-color: yellow">
						<td>21</td>
						<td>Средний уровень угрозы отказа/поломки</td>
					</tr>
					<tr style="background-color: orange">
						<td>34</td>
						<td>Высокий уровень угрозы отказа/поломки</td>
					</tr>
					<tr style="background-color: red">
						<td>>45</td>
						<td>Критический уровень угрозы отказа/ поломки</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="card-body">
			<div v-if="loading">Загрузка данных</div>
			<div v-else>
				<p>Выборка: <strong>Отчет о параметрах МНЛЗ с 01.07.2020 по 01.10.2020</strong></p>
				<p>Время расчета: <strong>{{ time }}</strong></p>
				<p>Ожидаемая дата поломки: </p>
				<table class="table table-striped">
					<tr>
						<th>Плавка</th>
						<th>Кр. 1</th>
						<th>Кр. 2</th>
						<th>Кр. 3</th>
						<th>Кр. 4</th>
						<th>Кр. 5</th>
						<th>Кр. 6</th>
						<th>Дата</th>
					</tr>
					<tr v-for="d in solved_data">
						<td>{{ d.plavka }}</td>
						<td>{{ d.rez_1.toFixed(2) }}</td>
						<td>{{ d.rez_2.toFixed(2) }}</td>
						<td>{{ d.rez_3.toFixed(2) }}</td>
						<td>{{ d.rez_4.toFixed(2) }}</td>
						<td>{{ d.rez_5.toFixed(2) }}</td>
						<td>{{ d.rez_6.toFixed(2) }}</td>
						<td>{{ d.date }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>

import axios from "axios";

export default {
	name: "Calculations",
	data() {
		return {
			loading: false,
			file_data: null,
			solved_data: []
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
		async loadData() {
			this.loading = true;
			this.file_data = (await axios.get(this.env.VUE_APP_API + '/api/parse')).data.data;
			this.loading = false;
		},
		calculate() {
			this.file_data.data.forEach(plavka => {
				let n;
				if (plavka.frequency < -4.42) {
					n = 4;
				} else if (plavka.frequency > -4.42 && plavka.frequency < -3.3) {
					n = 3;
				} else if (plavka.frequency > -3.3 && plavka.frequency < -2.16) {
					n = 2;
				} else if (plavka.frequency > -2.16 && plavka.frequency < -1.02) {
					n = 1;
				} else if (plavka.frequency > -1.02 && plavka.frequency < 0.12) {
					n = 1;
				} else if (plavka.frequency > 0.12 && plavka.frequency < 1.26) {
					n = 2;
				} else if (plavka.frequency > 1.26 && plavka.frequency < 2.39) {
					n = 3;
				} else if (plavka.frequency > 2.39) {
					n = 4;
				}
				n = (n - 195.48) / 10.28;

				let K
				if (plavka.hod < -1.42) {
					K = 4;
				} else if (plavka.hod > -1.42 && plavka.hod < -0.91) {
					K = 3;
				} else if (plavka.hod > -0.91 && plavka.hod < -0.39) {
					K = 2;
				} else if (plavka.hod > -0.39 && plavka.hod < 0.13) {
					K = 1;
				} else if (plavka.hod > 0.13 && plavka.hod < 0.65) {
					K = 1;
				} else if (plavka.hod > 0.65 && plavka.hod < 1.17) {
					K = 2;
				} else if (plavka.hod > 1.17 && plavka.hod < 1.69) {
					K = 3;
				} else if (plavka.hod > 1.69) {
					K = 4;
				}
				K = (K - 8.65) / 2.57;

				let T;
				if (plavka.delta < -10.74) {
					T = 4;
				} else if (plavka.delta > -10.74 && plavka.delta < -8.93) {
					T = 3;
				} else if (plavka.delta > -8.93 && plavka.delta < -7.12) {
					T = 2;
				} else if (plavka.delta > -7.12 && plavka.delta < -5.45) {
					T = 1;
				} else if (plavka.delta > -5.45 && plavka.delta < -3.21) {
					T = 1;
				} else if (plavka.delta > -3.21 && plavka.delta < -1.66) {
					T = 2;
				} else if (plavka.delta > -1.66 && plavka.delta < 0.15) {
					T = 3;
				} else if (plavka.delta > 0.15) {
					T = 4;
				}
				T = (T - 8.96) / 0.28;

				let C;
				if (plavka.uglerod < -7.17) {
					C = 4;
				} else if (plavka.uglerod -7.17 && plavka.uglerod < -5.05) {
					C = 3;
				} else if (plavka.uglerod > -5.05 && plavka.uglerod < -2.92) {
					C = 2;
				} else if (plavka.uglerod > -2.92 && plavka.uglerod < -0.79) {
					C = 1;
				} else if (plavka.uglerod > -0.79 && plavka.uglerod < 1.34) {
					C = 1;
				} else if (plavka.uglerod > 1.34 && plavka.uglerod < 3.47) {
					C = 2;
				} else if (plavka.uglerod > 3.47 && plavka.uglerod < 5.59) {
					C = 3;
				} else if (plavka.uglerod > 5.59) {
					C = 4;
				}
				C = (C - 0.19) / 0.02;

				let P = plavka.sechenie;
				if (P === 150) {
					P = 3;
				} else {
					P = 1;
				}

				this.solved_data.push({
					plavka: plavka.plav_passport_number,
					rez_1: 3 * n + 2 * K + T + C + 3 * this.getPersistence(plavka, 'persistence_1') + P,
					rez_2: 3 * n + 2 * K + T + C + 3 * this.getPersistence(plavka, 'persistence_2') + P,
					rez_3: 3 * n + 2 * K + T + C + 3 * this.getPersistence(plavka, 'persistence_3') + P,
					rez_4: 3 * n + 2 * K + T + C + 3 * this.getPersistence(plavka, 'persistence_4') + P,
					rez_5: 3 * n + 2 * K + T + C + 3 * this.getPersistence(plavka, 'persistence_5') + P,
					rez_6: 3 * n + 2 * K + T + C + 3 * this.getPersistence(plavka, 'persistence_6') + P,
					date: plavka.date
				})
			});
		},
		getPersistence(plavka, field) {
			let p1;
			if (plavka[field] < 1000) {
				p1 = 0;
			} else if (plavka[field] > 1000 && plavka[field] < 2000) {
				p1 = 1;
			} else if (plavka[field] > 2001 && plavka[field] < 3000) {
				p1 = 2;
			} else if (plavka[field] > 3001 && plavka[field] < 4000) {
				p1 = 3;
			} else if (plavka[field] > 4001 && plavka[field] < 5000) {
				p1 = 4;
			} else if (plavka[field] > 5001 && plavka[field] < 6000) {
				p1 = 5;
			} else if (plavka[field] > 6001 && plavka[field] < 7000) {
				p1 = 6;
			} else if (plavka[field] > 7001 && plavka[field] < 8000) {
				p1 = 7;
			} else if (plavka[field] > 8001 && plavka[field] < 9000) {
				p1 = 8;
			} else if (plavka[field] > 9001 && plavka[field] < 10000) {
				p1 = 9;
			} else if (plavka[field] > 10001) {
				p1 = 10;
			}
			return p1;
		}
	},
	async mounted() {
		this.loading = true;
		await this.loadData();
		this.loading = false;
		this.calculate();
	}
}
</script>

<style scoped>

</style>