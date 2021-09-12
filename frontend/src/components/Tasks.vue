
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
              <vs-button border info> Update </vs-button>
              <vs-button border danger @click="removeTask(task.id)">
                Remove
              </vs-button>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    editActive: false,
    edit: null,
    editProp: "",
    search: "",
    allCheck: false,
    page: 1,
    max: 3,
    active: 0,
    selected: [],
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
  },
  mounted() {
    this.$store.dispatch("getAllTasks");
  },
};
</script>

<style lang="scss">
.task-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  &--description {
  }
  &--buttons {
    display: flex;
    align-items: center;
  }
}
</style>

        