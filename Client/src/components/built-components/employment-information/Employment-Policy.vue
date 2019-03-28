<template>
    <div>
        <my-title title="就业政策" style="margin-top: 2%;"></my-title>
        <el-table :data="policies" border stripe style="width: 100%;">
            <el-table-column
                prop="title"
                :label="columns[0]"
                width="150">
            </el-table-column>
            <el-table-column
                prop="content"
                :label="columns[1]"
                >
            </el-table-column>
            <el-table-column
                fixed="right"
                :label="columns[2]"
                width="100">
                 <template slot-scope="scope">
                    <el-button type="text" @click="showDetail(scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <my-pagination :setting="setting" @current-change="handleCurrentChange"></my-pagination>
    </div>
</template>

<script>
export default {
    name: 'EmploymentPolicy',
    data () {
        return {
            policies: [
                {
                    id: 1,
                    title: '云南省促进高校毕业生就业创业政策100问',
                    content: '党的十八届三中、四中全会提出，推动实现更高质量就业。省委、省政府高度重视高校毕业生就业工作，出台了一系列促进高校毕业生就业创业的政策措施，特别是2013年、2014年分别出台了《关于进一步加强普通高等学校毕业生就业工作的通知》（云政办发〔2013〕74号）和《云南省人民政府办公厅关于进一步做好普通高等学校毕业生就业创业工作的通知》（云政办发〔2014〕30号），进一步细化和完善了毕业生就业创业政策。省委高校工委、省教育厅和高校积极开展云南青年志在四方宣传教育活动，拓展就业创业渠道，搭建就业创业平台，促进高校毕业生更加充分、更高质量的就业。为使高校毕业生进一步掌握就业创业的相关政策，我们把近年来国家和省涉及高校毕业生就业创业的相关政策汇编成册，为全省广大高校毕业生提供就业创业指导与服务。在编写过程中，我们力求从政策性、实用性入手，根据相关政策，编印了与大学生就业创业密切相关的内容，主要涉及到基层就业、自主创业、应征入伍、科研助理等方面的政策规定，同时附有涉及问答内容相关文件名称，以便查询，相关政策如有变动的，请以正式文件为准。希望这本小册子能给广大高校毕业生就业创业提供帮助和政策指导。'.slice(0,40) + '......'
                },
                {
                    id: 2,
                    title: '云南省促进高校毕业生就业创业政策100问',
                    content: '党的十八届三中、四中全会提出，推动实现更高质量就业。省委、省政府高度重视高校毕业生就业工作，出台了一系列促进高校毕业生就业创业的政策措施，特别是2013年、2014年分别出台了《关于进一步加强普通高等学校毕业生就业工作的通知》（云政办发〔2013〕74号）和《云南省人民政府办公厅关于进一步做好普通高等学校毕业生就业创业工作的通知》（云政办发〔2014〕30号），进一步细化和完善了毕业生就业创业政策。省委高校工委、省教育厅和高校积极开展云南青年志在四方宣传教育活动，拓展就业创业渠道，搭建就业创业平台，促进高校毕业生更加充分、更高质量的就业。为使高校毕业生进一步掌握就业创业的相关政策，我们把近年来国家和省涉及高校毕业生就业创业的相关政策汇编成册，为全省广大高校毕业生提供就业创业指导与服务。在编写过程中，我们力求从政策性、实用性入手，根据相关政策，编印了与大学生就业创业密切相关的内容，主要涉及到基层就业、自主创业、应征入伍、科研助理等方面的政策规定，同时附有涉及问答内容相关文件名称，以便查询，相关政策如有变动的，请以正式文件为准。希望这本小册子能给广大高校毕业生就业创业提供帮助和政策指导。'.slice(0,40) + '......'
                },
                {
                    id: 3,
                    title: '云南省促进高校毕业生就业创业政策100问',
                    content: '党的十八届三中、四中全会提出，推动实现更高质量就业。省委、省政府高度重视高校毕业生就业工作，出台了一系列促进高校毕业生就业创业的政策措施，特别是2013年、2014年分别出台了《关于进一步加强普通高等学校毕业生就业工作的通知》（云政办发〔2013〕74号）和《云南省人民政府办公厅关于进一步做好普通高等学校毕业生就业创业工作的通知》（云政办发〔2014〕30号），进一步细化和完善了毕业生就业创业政策。省委高校工委、省教育厅和高校积极开展云南青年志在四方宣传教育活动，拓展就业创业渠道，搭建就业创业平台，促进高校毕业生更加充分、更高质量的就业。为使高校毕业生进一步掌握就业创业的相关政策，我们把近年来国家和省涉及高校毕业生就业创业的相关政策汇编成册，为全省广大高校毕业生提供就业创业指导与服务。在编写过程中，我们力求从政策性、实用性入手，根据相关政策，编印了与大学生就业创业密切相关的内容，主要涉及到基层就业、自主创业、应征入伍、科研助理等方面的政策规定，同时附有涉及问答内容相关文件名称，以便查询，相关政策如有变动的，请以正式文件为准。希望这本小册子能给广大高校毕业生就业创业提供帮助和政策指导。'.slice(0,40) + '......'
                },
            ],
            columns: [ '政策名称', '内容简介', '操作' ],
             // 关于分页的设置
            setting: {
                pageSize: 5,
                total: null
            },
            // 临时变量
            temp: null,
        }
    },
    created() {
        // 初始化记录的总数目
        this.setting.total = this.policies.length;
         // 初始化临时变量
        this.temp = this.policies;
        // 初始化首页的显示记录
        this.handleCurrentChange(1);
    },
    methods: {
        showDetail: function(row) {
            this.$router.push({ path: '/policyment-detail/' + row.id });
        },
        handleCurrentChange: function(val) {
            if(val === 1) {
                this.policies = this.temp.slice(0, this.setting.pageSize);;
            }else {
                this.policies = this.temp.slice( this.setting.pageSize*(val-1) );
            }
        }
    },
}
</script>

<style scoped>
    .el-table {
        width: 100%;
    }
</style>

