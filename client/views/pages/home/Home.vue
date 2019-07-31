<script>

  import Introduction from './Introduction.vue'
  import Principles from './Principles.vue'
  import Animation from './Animation.vue'
  import AppHeader from '@/views/modules/AppHeader.vue'
  import AppFooter from '@/views/modules/AppFooter.vue'
  import Partners from './Partners.vue'
  import Services from './Services.vue'
  import Projects from './Projects.vue'
  import Contacts from './Contacts.vue'

  export default {
    title: 'Quarter',

    components: {
      Introduction,
      Principles,
      Animation,
      AppHeader,
      AppFooter,
      Partners,
      Services,
      Projects,
      Contacts,
    },
  }
</script>

<template>
  <section class="page fonts">
    <app-header/>
    <main class="content">
      <animation/>
      <introduction/>
      <principles/>
      <partners/>
      <services/>
      <projects/>
      <contacts/>
    </main>
    <app-footer/>
  </section>
</template>
