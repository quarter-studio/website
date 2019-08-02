<script>
  import Introduction from './Introduction.vue';
  import Principles from './Principles.vue';
  import Animation from './Animation.vue';
  import Partners from './Partners.vue';
  import Projects from './Projects.vue';
  import Services from './Services.vue';
  import Contacts from './Contacts.vue';
  import Title from '@/support/mixins/Title.js';

  import Editor from '@/app/editor/Editor.vue';

  export default {
    title: 'Quarter',

    mixins: [
      Title,
    ],

    components: {
      Introduction,
      Principles,
      Animation,
      Partners,
      Projects,
      Services,
      Contacts,
      Editor,
    },

    computed: {
      isEditing () {
        return (
          this.$store.state.animation.key &&
          this.$store.state.editor.visible
        );
      },
    },
  };
</script>

<template>
  <main class="content">
    <editor v-if="isEditing"/>
    <animation/>
    <introduction/>
    <principles/>
    <partners/>
    <services/>
    <projects/>
    <contacts/>
  </main>
</template>
