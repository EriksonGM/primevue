export default defineNuxtRouteMiddleware((to, from) => {
    console.log(from.path + ' -> ' + to.path);
})