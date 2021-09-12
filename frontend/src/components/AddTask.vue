<template>
  <div class="task-add">
    <div class="task-add--input">
      <vs-input
        label="Name"
        v-model.trim="name"
        placeholder="Enter task name"
      />
    </div>
    <div class="task-add--input">
      <vs-input
        label="Description"
        v-model.trim="description"
        placeholder="Enter task description"
      />
    </div>
    <div class="task-add--input">
      <vs-button border :active="true" @click="addTask()">Add task</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
    };
  },
  methods: {
    addTask() {
      let task = {
        name: this.name,
        description: this.description,
      };
      this.$store.dispatch("addTask", task).then(() => {
        this.$vs.notification({
          progress: "auto",
          color: "success",
          position: "top-right",
          title: "Successfull! Task added!",
        });
      });
    },
  },
};
</script>

<style lang="scss">
.task-add {
  display: flex;
  align-items: center;
  padding: 20px 0;
  &--input {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>