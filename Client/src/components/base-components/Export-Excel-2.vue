<template>
    <div>
        <el-button type="primary" @click="export2Excel" size="small">导出</el-button>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { export_json_to_excel } from '../../vendor/Export2Excel';
export default {
    name: 'ExportExcel2',
    props: [ 'excelSetting' ],
    data () {
        return {

        }
    },
    methods: {
        formatJson: function(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        export2Excel: function() {
            require.ensure([], () => {
                const { exxport_json_to_excel } = require('../../vendor/Export2Excel.js');
                const data = this.formatJson(this.excelSetting.filterVal, this.excelSetting.list);
                export_json_to_excel(this.excelSetting.tHeader, data, this.excelSetting.fileName);
            })
        }
    },
}
</script>

<style scoped>

</style>
