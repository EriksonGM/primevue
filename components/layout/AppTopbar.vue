<script setup>
import {ref, computed, onMounted, onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';

const {layoutConfig, onMenuToggle, changeThemeSettings, isDarkTheme} = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
  bindOutsideClickListener();
});
onBeforeUnmount(() => {
  unbindOutsideClickListener();
});
const logoUrl = computed(() => {
  return `/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};

const onSettingsClick = () => {
  topbarMenuActive.value = false;
  router.push('/utilities/documentation');
};

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };

    document.addEventListener('click', outsideClickListener.value);
  }
};

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};

const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;
  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const setDarkMode = ()=> {
  changeThemeSettings('aura-dark-amber',true);
  console.log(layoutConfig.darkTheme.value);
}

const setLigthMode = ()=> {

  changeThemeSettings('aura-light-amber',false);
  console.log(layoutConfig.darkTheme.value);
}

const toogleDarkMode = () => {
  const elementId = 'theme-css';
  const linkElement = document.getElementById(elementId);
  linkElement.setAttribute('href', layoutConfig.darkTheme.value ? '/themes/lara-light-indigo/theme.css' : '/themes/lara-dark-indigo/theme.css');
  cloneLinkElement.setAttribute('id', elementId + '-clone');
}

const onChangeTheme = (theme, mode) => {
  const elementId = 'theme-css';
  const linkElement = document.getElementById(elementId);
  const cloneLinkElement = linkElement.cloneNode(true);
  const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);

  cloneLinkElement.setAttribute('id', elementId + '-clone');
  cloneLinkElement.setAttribute('href', newThemeUrl);
  cloneLinkElement.addEventListener('load', () => {
    linkElement.remove();
    cloneLinkElement.setAttribute('id', elementId);
    changeThemeSettings(theme, mode === 'dark');
  });
  linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};

</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo"/>
      <span>SAKAI</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="onChangeTheme('lara-dark-indigo', 'dark')" class="p-link layout-topbar-button" v-if="!layoutConfig.darkTheme.value">
        <i class="pi pi-moon"></i>
        <span>Dark Theme</span>
      </button>

      <button @click="onChangeTheme('lara-light-indigo', 'light')" class="p-link layout-topbar-button" v-if="layoutConfig.darkTheme.value">
        <i class="pi pi-sun"></i>
        <span>Light Theme</span>
      </button>

      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button>

      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>
      <button @click="onSettingsClick()" class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
