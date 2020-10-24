const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

class ExcelParser {
	constructor() {
		this.worksheet = null;
		let files = fs.readdirSync(path.resolve(__dirname, '../storage'));
		this.data_file_name = files[0];
	}

	parsePlav() {
		if (this.data_file_name) {
			try {
				let file = XLSX.readFile(path.resolve(__dirname, `../storage/${this.data_file_name}`));

				this.worksheet = file.Sheets[file.SheetNames[0]];

				const result = {
					name: null,
					fields: this.getFields(),
					data: this.parseData()
				}

				result.name = this.worksheet['D1'].v;

				return result;
			} catch (e) {
				console.log(e);
				return null;
			}
		} else {
			return {
				error: true,
				message: 'Не загружены данные для анализа!'
			}
		}
	}

	getFields() {
		let i = 3;
		let worksheet = this.worksheet;

		return {
			date: worksheet[`C${i}`].v,
			plav_passport_number: worksheet[`B${i}`].v,
			plav_number_in_seria: worksheet[`G${i}`].v,
			seria: 'Серия',
			steel_mark: worksheet[`E${i}`].v,
			steel_weight: worksheet[`N${i}`].v,
			steel_temp: worksheet[`R${i}`].v,
			persistence_1: worksheet[`T${i}`].v,
			persistence_2: worksheet[`U${i}`].v,
			persistence_3: worksheet[`V${i}`].v,
			persistence_4: worksheet[`X${i}`].v,
			persistence_5: worksheet[`Y${i}`].v,
			persistence_6: worksheet[`Z${i}`].v,
			water_expense_1: worksheet[`AF${i}`].v,
			water_expense_2: worksheet[`AG${i}`].v,
			water_expense_3: worksheet[`AH${i}`].v,
		}
	}

	parseData() {
		let worksheet = this.worksheet;
		let plavs = [];
		let i = 4;

		let seria;
		let last_seria_step;

		while (i) {
			if (worksheet[`A${i}`]) {
				if (!last_seria_step || parseInt(worksheet[`G${i}`].v) < last_seria_step) {
					seria = Math.floor(Math.random() * 1000000);
					last_seria_step = parseInt(worksheet[`G${i}`].v);
				} else {
					last_seria_step = parseInt(worksheet[`G${i}`].v);
				}

				plavs.push({
					date: worksheet[`C${i}`].v,
					plav_passport_number: worksheet[`B${i}`].v,
					plav_number_in_seria: parseInt(worksheet[`G${i}`].v),
					seria: seria,
					steel_mark: worksheet[`E${i}`].v,
					steel_weight: worksheet[`N${i}`].v,
					steel_temp: parseInt(worksheet[`R${i}`].v),
					persistence_1: parseInt(worksheet[`T${i}`].v),
					persistence_2: parseInt(worksheet[`U${i}`].v),
					persistence_3: parseInt(worksheet[`V${i}`].v),
					persistence_4: parseInt(worksheet[`X${i}`].v),
					persistence_5: parseInt(worksheet[`Y${i}`].v),
					persistence_6: parseInt(worksheet[`Z${i}`].v),
					water_expense_1: parseInt(worksheet[`AF${i}`].v),
					water_expense_2: parseInt(worksheet[`AG${i}`].v),
					water_expense_3: parseInt(worksheet[`AH${i}`].v),
				});
				i++;
			} else {
				break;
			}
		}

		return plavs;
	}
}

module.exports = ExcelParser;