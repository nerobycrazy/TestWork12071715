<template>
  <div id="app">
    <div class="container">
      <h1>Simple CRUD Application</h1>
      <h2>Add New Task</h2>
      <AddTask />
      <h2>List Tasks</h2>
      <Tasks />
    </div>
  </div>
</template>

<script>
import AddTask from "@/components/AddTask.vue";
import Tasks from "@/components/Tasks.vue";
export default {
  name: "App",
  components: {
    AddTask,
    Tasks,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1,
h2 {
  margin-bottom: 15px;
}
#app {
  .container {
    font-family: "Roboto";
    max-width: 1200px;
    padding: 40px 15px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
