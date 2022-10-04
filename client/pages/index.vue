<template>
  <div>
    <div class="flex flex-row gap-4">
      <section class="w-full pt-8">
        <div class="flex flex-col gap-5">
          <h1 class="text-5xl font-bold">API JSON-Server</h1>
          <label class="font-semibold">Masukan Nama Negara</label>
        </div>
        <div>
          <input type="text" v-model="nama" class="input-stl" />
          <div v-bind:class="{ hidden: !isHidden }">
            <button @click="add(nama)" class="mt-4 btn-send">Submit</button>
          </div>
        </div>
        <div v-bind:class="{ hidden: isHidden }">
          <button @click="update()" class="mt-4 btn-send">Update</button>
        </div>
      </section>
      <section class="w-full">
        <ul class="pt-8">
          <label class="font-semibold">Cari Nama Negara</label>
          <input type="text" v-model="searchKey" class="mb-4 input-stl" />
          <h2 class="p-2 text-2xl font-semibold text-white bg-slate-400">
            Data Negara
          </h2>
          <li
            class="flex justify-between p-2 border border-slate-300"
            v-for="country in filteredCountries"
            :key="country.id"
          >
            {{ country.nama }}
            <div>
              <button @click="get(country.id)" class="btn-send">Edit</button>
              <button @click="remove(country.id)" class="btn-del">Hapus</button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: function () {
    return {
      nama: "",
      searchKey: "",
      isHidden: true,
      activeItem: null,
      countries: this.$store.state.countries,
    };
  },

  // mapState(["countries"])
  computed: {
    filteredCountries() {
      return this.countries.filter(
        (country) =>
          country.nama.toLowerCase().indexOf(this.searchKey.toLowerCase()) !==
          -1
      );
    },
  },
  methods: {
    add(nama) {
      this.$store.dispatch("submitData", nama);
      this.nama = "";
    },
    remove(id) {
      // console.log("hapus " + id);
      this.$store.dispatch("removeData", id);
    },
    get(id) {
      this.$store.dispatch("getData", id).then((res) => {
        this.nama = res.nama;
        this.activeItem = res;
        this.isHidden = false;
      });
    },
    update(nama) {
      this.$store.dispatch("updateData", {
        id: this.activeItem.id,
        nama: this.nama,
      });
      this.nama = "";
      this.isHidden = true;
    },
    //kita taruh dalam array, agar ketika kita punya lebih dari satu action, tinggal tambahkan dengan koma
    // ...mapActions(["add"]),
  },
};

// import axios from "~/plugins/axios.js";

// export default {
//   asyncData() {
//     return axios.get("negara").then((res) => ({
//       countries: res.data,
//     }));
//   },
// };
</script>

<style></style>
