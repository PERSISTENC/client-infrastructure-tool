
<template>
    <div class="layout">
        <Layout>
            <Header> 
                <Menu mode="horizontal" theme="dark" :active-name="menuActive" @on-select='handleMenuSelected'>
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem :name="item.name" v-for="item in menuItem" :key="item.name">
                            <Icon type="ios-navigate"></Icon>
                            {{item.name}}
                        </MenuItem>
                     
                    </div>
                </Menu>
            </Header>
            <Layout style="margin:24px; 0">
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" >
                        <Submenu :name="children.name"  v-for="children in activeMenuData" :key="children.name">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                {{children.name}}
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                     
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',}">
                        <ModalForm v-model="model" title="测试" :formItem="formItem" :labelWidth='120'/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import { ModalForm } from '@/template'
export default {
    name:'home',
    data(){
        return {
            model:true,
            menuActive:'Server',
            menuItem:[
                {
                    name:'Server',
                    children:[
                        {
                            name:'Cache',
                        },
                        {
                            name:'HttpServer'
                        }
                    ]
                },
                {
                    name:'Components',
                    children:[
                        {
                            name:'Add Option'
                        },
                        {
                            name:'Table Group'
                        }
                    ]
                },
                {
                    name:'Utils'
                },
                {
                    name:'Module',
                    children:[
                        {
                            name:'Oss Upload'
                        }
                    ]
                },
                {
                    name:'Directive',
                    children:[
                        {
                            name:'Illegality Character'
                        }
                    ]
                },
                {
                    name:'Template',
                    children:[
                        {
                            name:'FormModal'
                        }
                    ]
                }
            ],
            formItem:[
                {
                    label:'用户名',
                    prop:'user',
                    required:true,
                    formItemType:'input',
                },
                {
                    label:'账号'
                },
                {
                    label:'密码'
                }
            ]
        }
    },
    computed:{
        activeMenuData(){
            try {
                return this.menuItem.find(obj=>obj.name === this.menuActive).children
            }catch(err){
                return []
            }   
        }
    },
    components:{
        ModalForm
    },
    methods: {
        handleMenuSelected(name){
            this.menuActive = name
        }
    }
}
</script>
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 700px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout, .ivu-layout{
    height: 100%;
}
</style>