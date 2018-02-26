<template>
    <v-layout row wrap class="categoryList">

        {{requested}}
    </v-layout>
</template>

<script>
    import algoliasearch from 'algoliasearch'

    export default {
        name: 'searchInput',
//        props: ['categories'],
        data () {
            return {
                index: null,
                query: '',
                requested: null
            }
        },
        watch:{
            query(){
                this.searchQuery()
            }
        },
        created(){
            let self = this;

            console.log('StartS')
            let client = algoliasearch('C1WQ7KERHP', 'f08676a6f377919213c6f4fbab158439');

            this.index = client.initIndex('ateuco');
        },
        mounted(){},
        methods:{
            searchQuery(){
                this.index.search(this.query, function(err, content) {
                    console.log(content.hits);
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .category{
        outline: none;
        list-style: none;
        text-align: left;
        /*padding: 0 7px;*/
    }
    .category__item{
        padding: 5px 0;

    }
    .category__itemLink{
        text-decoration: none;
        color: #828385;
    }
    .category__itemLink:hover{
        color: #4B525F;
    }
    .category__itemLink_active{
        color: #445C8B;
        font-weight: 600;
    }
</style>