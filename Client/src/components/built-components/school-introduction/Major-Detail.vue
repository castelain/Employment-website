<template>
    <my-container>
        <my-header slot="my-header" id="nav"></my-header>

        <div id="content">
            <my-row>
                <my-inner-nav :navs="innerNavs"></my-inner-nav>
                <my-title :title="majorDetail.name"></my-title>
                <div class="text-bold" id="majors">
                    {{ majorDetail.majors }}
                </div>
                <div>
                    {{ majorDetail.content }}
                </div>
            </my-row>
        </div>

        <my-footer slot="my-footer"></my-footer>
    </my-container>
</template>

<script>
export default {
    name: 'MajorDetail',
    data () {
        return {
            navHeight: null,
            // 内部导航数据
            innerNavs: [
                {
                    src: '/',
                    msg: '首页'
                },
                {
                    src: '/school-introduction/major-introduction',
                    msg: '学院列表'
                },
                {
                    src: '#',
                    msg: '专业详情' 
                }
            ],
            // 内容数据
            majorDetail: {
                name: '信息学院',
                majors: '软件工程、信息安全、数字媒体技术',
                content: `专业名称：计算机科学与技术
                        培养目标：旨在培养系统掌握计算机科学理论、计算机软硬件系统及应用知识，具备本领域分析、解决问题能力和实践技能以及良好处语运用能力的高级专门人才。
                        主干课程：学生主要学习高级语言程序设计，模拟电子技术，数字电路与逻辑高设计，编译技术，数据库概论，计算机组成原理，软件工程，数据结构，计算机图形学，汇编语言程序设计，算法设计与分析，计算机系统结构，数据库设计及应用，人工智能引论，分布式程序设计，嵌入式系统，信息安全等课程。
                        就业方向：毕业生可到党政机关、企事业单位、科研院所、教育系统、行政管理部门等单位工作。
                        学制：四年。
                        授予学位：工学学士学位。
                        学院联系电话：65033085
                        专业名称：计算机科学与技术（武警国防班）
                        培养目标：本专业是为武警部队培养系统地掌握计算机科学理论、计算机软硬件系统及应用知识，具备本领域分析问题、解决问题的能力和实践技能以及良好处语运用能力，在国防现代化和武警部队信息化建设中起骨干作用的高级技术人才。
                        主干课程：学生主要学习高级语言程序设计，模拟电子技术，数字电路与逻辑高设计，编译技术，数据库概论，计算机组成原理，软件工程，数据结构，计算机图形学，汇编语言程序设计，算法设计与分析，计算机系统结构，数据库设计及应用，人工智能引论，分布式程序设计，嵌入式系统，信息安全等专业课程，还需学习忠诚卫士修养、军事法规、武警心理学、军事思想、武警健康教育、武警基础管理、武警基层文化工作等军政必修课。
                        就业方向：本专业学生毕业后，统一安排到武警部队工作。
                        学制：四年。
                        授予学位：工学学士学位。`
            }
        }
    },
    mounted() {
        let nav = document.getElementById('nav');
        this.navHeight = window.getComputedStyle(nav).height;
        document.getElementById('content').style.marginTop = this.navHeight;
    },
}
</script>

<style scoped>
    #majors {
        margin-top: -4%;
        margin-bottom: 4%;
    }
</style>

