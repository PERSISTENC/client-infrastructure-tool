<script>
export default {
  props: {},
  render() {
    return (
      <Table
        ref="table"
        columns={this.tableColumn}
        data={this.data}
        on-on-selection-change={this.handleSelectionChange}
        on-on-sort-change={this.handleSortChange}
      />
    );
  },
  methods: {
    //   勾选change 事件
    handleSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    //  排序change事件
    handleSortChange() {
      this.$emit("on-sort-change", ...arguments);
    },
  },
};
</script>