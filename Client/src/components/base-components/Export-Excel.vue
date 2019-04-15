<template>
    <div>
        <el-button type="primary" @click="exportExcel" size="small">导出</el-button>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    name: 'ExportExcel',
    props: [ 'excelSetting' ],
    data () {
        return {

        }
    },
    methods: {
        exportExcel: function() {
            // 判断要导出的节点中是否有fixed的表格，若有，则在转换excel时先将该dom移除，转换完成后再将其append回去
            let fixed = document.querySelector('.el-table__fixed-right');
            let workBook;
            if(fixed) {
                workBook = XLSX.utils.table_to_book(document.querySelector(this.excelSetting.domStr).removeChild(fixed));
                document.querySelector(this.excelSetting.domStr).append(fixed);
            }else {
                workBook = XLSX.utils.table_to_book(document.querySelector(this.excelSetting.domStr));
            }
            let workBookOut = XLSX.write(workBook,
                {
                    bookType: this.excelSetting.type,
                    bookSST: true, 
                    type: 'array'
                });
            try {
                FileSaver.saveAs(new Blob([workBookOut],
                    {
                        type: 'application/octet-stream'
                    }),
                    this.excelSetting.fileName + '.' + this.excelSetting.type
                );
            } catch(error) {
                if(typeof console !== 'undefined') {
                    console.log(e, workBookOut);
                }
            }
            return workBookOut;
        }
    },
}
</script>

<style scoped>

</style>
