<template>
    <v-layout row wrap class="categoryList">
        <ul class="category">
            <li class="category__item" v-for="item in categories">
                <a class="category__itemLink" href="#" @click.prevent="getClicked(item); activeLink($event.target)">{{item.name.toUpperCase()}}</a>
            </li>
        </ul>
    </v-layout>
</template>

<script>
    export default {
        name: 'categoryList',
        props: ['categories'],
        data () {
            return {}
        },
        created(){},
        mounted(){},
        methods:{
            getClicked(e){
                this.$emit('getClicked', e)
//                this.$parent.getInfo(e.)
            },
            activeLink(target){
                let buttons = document.getElementsByClassName('category__itemLink')

                for(let i = 0; i < buttons.length; i++){
                    if(buttons[i].classList.contains('category__itemLink_active')){
                        buttons[i].classList.remove('category__itemLink_active')
                    }
                }
                target.classList.add('category__itemLink_active')
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