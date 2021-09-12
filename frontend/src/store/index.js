import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

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
    }
  },
  actions: {
    async getAllTasks({ commit }) {
      let { data } = await axios.get('http://192.168.1.104:8000/api/tasks');
      commit('SET_TASKS', data);
    },
    async addTask({ commit }, task) {
      let result = await axios.post('http://192.168.1.104:8000/api/tasks/', task);
      if (result.status === 200) {
        commit('ADD_TASK', result.data);
      }
    },
    async removeTask({ commit }, id) {
      let result = await axios.delete('http://192.168.1.104:8000/api/tasks/' + id);
      if (result.status === 200) {
        commit('DELETE_TASK', id);
      }
    }
  },
  getters: {
    getTasks: state => {
      return state.tasks.slice().reverse()
    }
  }
})
