import axios from "~/plugins/axios.js";

export function state() {
  return {
    countries: [],
  };
}

export let mutations = {
  setData(state, items) {
    state.countries = items;
  },

  addData(state, item) {
    state.countries.push(item);
  },

  removeData(state, id) {
    let foundIndex;

    foundIndex = state.countries.findIndex((p) => {
      return p.id === id;
    });

    state.countries.splice(foundIndex, 1);
  },

  updateData(state, data) {
    let foundItem;

    foundItem = state.countries.find((xyz) => {
      return xyz.id === data.id;
    });
    foundItem.nama = data.nama;
  },
};

export let actions = {
  async nuxtServerInit({ commit }) {
    let res;
    res = await axios.get("negara");
    commit("setData", res.data);
  },

  async submitData({ commit }, nama) {
    let res;
    res = await axios.post("negara", { nama: nama });
    commit("addData", res.data);
  },

  async removeData({ commit }, id) {
    let res;
    res = await axios.delete("negara/" + id);
    commit("removeData", id);
  },

  async getData({ commit }, id) {
    let res;
    res = await axios.get("negara/" + id);
    return res.data;
  },

  async updateData({ commit }, data) {
    let res;
    res = await axios.put("negara/" + data.id, { nama: data.nama });
    commit("updateData", data);
  },
};
