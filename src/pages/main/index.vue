<template>
    <div id="main">
        <div class="mainPage">
            <v-container fluid class="pt-3 pb-3">
                <v-layout row wrap>
                    <v-flex xs12 sm12 md12 lg12 class="pb-1">
                        <!--<searchInput></searchInput>-->
                        <v-layout row wrap>
                            <v-flex xs2 class="pb-1">
                                <categoryList :categories="catList" @getClicked="getInfo"></categoryList>
                            </v-flex>
                            <v-flex xs10 class="pb-1">
                                <stuffList :data="curFilters"></stuffList>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import categoryList from '../../components/categoryList.vue'
    import stuffList from '../../components/stuffList.vue'
    import searchInput from '../../components/searchInput.vue'

    export default {
        name: 'main',
        components: {
//          CATEGORY TABLE
            categoryList,
//          STUFF BLOCK
            stuffList,
//          SEARCH INPUT
            searchInput
        },
        data(){
            return{
                catList: null,
                curFilters: [],
                products: []
            }
        },
        created(){
            let self = this;

            const io = self.socket('ateucoback.jelastic.regruhosting.ru');

//            connect.on('connect',()=>{
//                console.log('Good');
//            });

            io.on('catalog_list', (data)=>{
                self.catList = data;
            });
            io.emit('get_catalog_list', {})
        },
        methods:{
            getInfo(e){
                this.curFilters = e;
            }
        }

    }
</script>

<style>
    #main {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 20px;
    }
</style>
