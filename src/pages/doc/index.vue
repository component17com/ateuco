<template>
    <div id="main">
        <div class="docPage">
            <v-container fluid class="pt-3 pb-3 pr-4 pl-4">
                <v-layout row wrap class="categoryList">
                    <iframe src="http://ateucoback.jelastic.regruhosting.ru/images/Ateuco.html" frameborder="0" id="docFrame"></iframe>
                </v-layout>
            </v-container>
        </div>
    </div>

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
    #docFrame{
        padding: 5px 13px;
        height: 80vh;
        width: 100%;
    }
</style>