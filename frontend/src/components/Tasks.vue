
<template>
  <div class="tasks">
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> Name </vs-th>
          <vs-th> Description </vs-th>
          <vs-th> Created </vs-th>
          <vs-th> Control </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(task, i) in tasks">
          <vs-td>
            {{ task.name }}
          </vs-td>
          <vs-td>
            {{ task.description || "No description" }}
          </vs-td>
          <vs-td>
            {{ task.created_at }}
          </vs-td>
          <vs-td>
            <div class="task-content--buttons">
              <vs-button border info @click="openModal(task)">
                Update
              </vs-button>
              <vs-button border danger @click="removeTask(task.id)">
                Remove
              </vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <vs-dialog width="300px" not-center v-model="activeEdit">
      <template #header>
        <h4 class="not-margin">
          Edit task #<b>{{ taskID }}</b>
        </h4>
      </template>

      <div class="task-edit--input">
        <vs-input
          v-model.trim="name"
          label="Name"
          placeholder="Name"
        ></vs-input>
      </div>
      <div class="task-edit--input">
        <vs-input
          v-model.trim="description"
          label="Description"
          placeholder="Description"
        ></vs-input>
      </div>

      <template #footer>
        <div class="task-edit--buttons">
          <vs-button @click="updateTask"> Ok </vs-button>
          <vs-button @click="closeModal" dark> Cancel </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    taskID: null,
    name: "",
    description: "",
    activeEdit: false,
  }),
  computed: {
    tasks() {
      return this.$store.getters.getTasks;
    },
  },
  methods: {
    removeTask(id) {
      this.$store.dispatch("removeTask", id).then(() => {
        this.$vs.notification({
          progress: "auto",
          color: "danger",
          position: "top-right",
          title: "Successfull! Task deleted!",
        });
      });
    },
    updateTask() {
      let task = {
        id: this.taskID,
        name: this.name,
        description: this.description,
      };
      if (task.name.length > 0) {
        this.$store.dispatch("updateTask", task).then(() => {
          this.activeEdit = false;
          this.$vs.notification({
            progress: "auto",
            color: "success",
            position: "top-right",
            title: "Successfull! Task updated!",
          });
        });
      }
    },
    openModal(task) {
      this.taskID = task.id;
      this.name = task.name;
      this.description = task.description;
      this.activeEdit = true;
    },
    closeModal() {
      this.taskID = null;
      this.name = "";
      this.description = "";
      this.activeEdit = false;
    },
  },
  mounted() {
    this.$store.dispatch("getAllTasks");
  },
};
</script>

<style lang="scss">
.task-content {
  &--buttons {
    display: flex;
    align-items: center;
  }
}
.task-edit {
  &--input {
    padding: 20px 0;
  }
  &--buttons {
    display: flex;
    align-items: center;
  }
}
</style>

        