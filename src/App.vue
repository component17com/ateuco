<template>
    <div>
        <v-app id="mainApp">
            <header>
                <v-toolbar class="transparent elevation-0 pt-2 header">
                    <v-btn flat class="header__btn hidden-sm-and-down" @click="go('/')">Примеры</v-btn>
                    <!--<v-btn flat class="header__btn hidden-sm-and-down" @click="go('/')">-->
                        <!--Корзина&nbsp;-->
                        <!--<i class="fa fa-shopping-cart fa-2x" aria-hidden="true" style="color:#666;"></i>-->
                    <!--</v-btn>-->
                    <v-btn flat class="header__btn hidden-sm-and-down" @click="go('/doc')">Документация</v-btn>
                    <v-spacer></v-spacer>
                    <!--<v-btn flat class="header__btn hidden-sm-and-down" @click.native="go('/')">Аккаунт</v-btn>-->

                    <v-menu :nudge-width="100"  class="hidden-md-and-up header">
                        <v-toolbar-title slot="activator" class="hidden-md-and-up">
                            <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
                        </v-toolbar-title>
                        <v-list>
                            <v-list-tile class="header__btn" @click="go('/')">Примеры</v-list-tile>
                            <!--<v-list-tile class="header__btn" @click="go('/')">-->
                                <!--Корзина&nbsp;-->
                                <!--<i class="fa fa-shopping-cart fa-2x" aria-hidden="true" style="color:#666;"></i>-->
                            <!--</v-list-tile>-->
                            <v-list-tile class="header__btn" @click="go('/doc')">Документация</v-list-tile>
                            <!--<v-list-tile class="header__btn" @click="go('/')">Аккаунт</v-list-tile>-->
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </header>
            <v-divider></v-divider>
            <main>
                <router-view></router-view>
            </main>
        </v-app>
    </div>
</template>

<script>
export default {
    name: 'app',
    methods:{
        go(path){
            this.$router.push(path);
        },
    }
}
</script>

<style>
#mainApp {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

}
</style>
