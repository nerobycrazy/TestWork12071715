import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

// BACKEND HOST & PORT
const host = "http://192.168.1.104";
const port = 8000;

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    SET_TASKS(state, payload) {
      state.tasks = payload;
    },
    ADD_TASK(state, payload) {
      state.tasks.push(payload);
    },
    DELETE_TASK(state, payload) {
      const i = state.tasks.map(item => item.id).indexOf(payload);
      state.tasks.splice(i, 1);
    },
    UPDATE_TASK(state, payload) {
      const i = state.tasks.map(item => item.id).indexOf(payload.id);
      Vue.set(state.tasks, i, payload);
    }
  },
  actions: {
    async getAllTasks({ commit }) {
      let { data } = await axios.get(`${host}:${port}/api/tasks`);
      commit('SET_TASKS', data);
    },
    async addTask({ commit }, task) {
      let result = await axios.post(`${host}:${port}/api/tasks/`, task);
      if (result.status === 200) {
        commit('ADD_TASK', result.data);
      }
    },
    async removeTask({ commit }, id) {
      let result = await axios.delete(`${host}:${port}/api/tasks/` + id);
      if (result.status === 200) {
        commit('DELETE_TASK', id);
      }
    },
    async updateTask({ commit }, task) {
      let result = await axios.put(`${host}:${port}/api/tasks/` + task.id, task);
      if (result.status === 200) {
        commit('UPDATE_TASK', result.data);
      }
    }
  },
  getters: {
    getTasks: state => {
      return state.tasks.slice().reverse()
    }
  }
})
