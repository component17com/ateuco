<template>
    <v-layout row wrap class="stuffList">
        <div style="width: 100%;margin-bottom:15px;">
            <input
                    type="text"
                    placeholder="Поиск ..."
                    style="border: 1px solid black; min-width: 300px; width: 57%; border-radius: 30px; display: block;margin: 0 auto; padding: 7px 13px;outline: none;"
                    v-model="query"
            >
        </div>
        <div v-show="query === '' && data.filters" style="display: block;margin: 0 auto;">
            <div v-for="(cur, index) in data.filters" style="display: inline-block;vertical-align: bottom;">
                <v-select
                        v-model="selected[cur.id]"
                        :options="cur.values"
                        multiple=""
                        label="name"
                        value="id"
                        :placeholder="cur.name"
                        style="margin-bottom: 11px;">
                </v-select>
            </div>
            <v-btn style="display: inline-block; vertical-align: text-bottom;" @click="clearSelect()" v-if="getData">Очистить Фильтр</v-btn>
        </div>
        <br>
        <div v-if="products.length" style="width:100%;">
            <div class="block" v-for="item in products">
                <div class="block__img">
                    <img :src="'http://erphub.ru/images/'+item.images[0]" v-if="item.images.length">
                    <img src="../assets/no_image.svg" v-else>
                    <span v-if="item.price">{{item.price.value}} <b>₽</b></span>
                    <span v-else>Не указанно</span>
                </div>
                <div class="block__text">

                    <div class="block__text_title">{{ item.name }}</div>
                    <hr>
                    <div class="block__text_desc">{{ item.desc }}</div>
                    <v-data-table v-if="item.info.length"
                                  v-bind:headers="headers"
                                  :items="item.info"
                                  hide-actions
                                  class="elevation-1"
                    >
                        <template slot="items" scope="props">
                            <td>{{ props.item.name }}</td>
                            <td class="text-xs-right">{{ props.item.value }}</td>
                        </template>
                    </v-data-table>
                </div>
            </div>
            <div class="text-xs-center">
                <v-pagination :length="totalPages" v-model="page" :total-visible="7"></v-pagination>
            </div>
        </div>
        <div class="text-xs-center" v-else>
            <br>
            <h3 class="subtitile">В этой категории нет ни одного товара</h3>
        </div>
    </v-layout>
</template>

<script>
    import algoliasearch from 'algoliasearch'
//    import select2 from "select2-component"

    export default {
        name: 'stuffList',
        props: ['data'],
        data () {
            return {
                selected: {},
                products: [],
                page: 1,
                totalPages: 0,
                limit: 15,
                io: null,
                getData: false,
                headers: [
                    {
                        text: 'Характеристики',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                ],
                index: null,
                query: '',
                requested: null,
                startSearch: false
            }
        },
        created(){
            let client = algoliasearch('C1WQ7KERHP', 'f08676a6f377919213c6f4fbab158439');

            this.index = client.initIndex('ateuco');
        },
        mounted(){
            this.io = this.socket('ateucoback.jelastic.regruhosting.ru');

            this.io.on('product_list', (data)=>{
                this.products = data.products;

                this.totalPages = Math.ceil(data.total/15);
                console.log(data)
            });
        },
        watch: {
            data(){
                this.getProducts();
            },
            selected(){
                this.page = 1;
//                console.log('SELECTED - ', this.selected);
                this.getProducts()

            },
            query(){
                this.searchQuery();
            },
            page(){
                window.scrollTo(0,0);
                this.getProducts()
            }
        },
        methods:{
            getProducts(){
                let self = this,
                    dataS = {
                        catalog: self.data.id,
                        fitered: this.selected,
                        skip: (this.page - 1) * this.limit,
                        limit: this.limit
                    };

                console.log('Start EMIT');

                if(this.data.filters.length) { this.getData = true }
                else{ this.getData = false }

                this.io.emit('get_product_list', dataS);
//                console.log('Select - ', this.selected)
            },
            searchQuery(){
                let self = this;
                this.index.search(this.query, function(err, content) {
                    console.log(content.hits);
                    self.products = content.hits;
                });
            },
            changeSelect(select){
                console.log('CHANGE! ', select);
                this.getProducts();
            },
            clearSelect(){
                this.selected = {};
                setTimeout(()=>{
                    this.selected = {};
                    console.warn(this.selected);
                }, 200);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .block{
        display: block;
        min-width: 800px;
        max-width: 90%;
        margin: 0 auto;
        text-align: left;
        padding: 10px 13px;
        position: relative;

        border: 1px solid #d4d4d4;
    }
    .block__img{
        display: inline-block;
    }
    .block__img img{
        display: block;
        width: 150px;
        height: 150px;
    }
    .block__img span{
        display: block;
        text-align: center;
        padding: 7px 0;
        text-decoration: underline;
        font-size: 18px;
    }
    .block__text{
        display: inline-block;
        position: inherit;
        width: 70%;
        vertical-align: top;
        margin-top: 10px;
        margin-left: 17px;
    }
    .block__text_title{
        display: block;
        padding: 12px 7px;
        font-size: 24px;
    }
    .block__text_desc{
        display: block;
        font-size: 17px;
        padding: 7px 7px;
    }
</style>