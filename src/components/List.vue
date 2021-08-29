<template>
  <v-sheet class="sheet mb-2" color="white" elevation="4">
    <v-toolbar flat color="white" class="pa-0" width="100%">
      <v-toolbar-title>Applied Loan Details</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Pay All</v-btn>
        </template>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn
          :disabled="item.status === 'paid'"
          color="success"
          @click="$emit('action', item)"
        >
          Pay
        </v-btn>
      </template>

      <template v-slot:no-data>
        No Data Available
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    // desserts: [],
    editedIndex: 0
  }),
  props: {
    items: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  }

  //   computed: {
  //     formTitle() {
  //       return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
  //     }
  //   },

  //   watch: {
  //     dialog(val) {
  //       val || this.close()
  //     }
  //   },

  //   created() {
  //     // this.initialize()
  //   },

  //   methods: {}
}
</script>
<style scoped>
.sheet >>> .v-toolbar__content {
  padding: 0px;
}
.sheet {
  padding: 24px;
  width: 100%;
  height: auto;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding: 0;
}

td {
  padding: 0px !important;
}
</style>
