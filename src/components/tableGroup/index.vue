
<script>
import dayjs from "dayjs";
import TableHeaderOptions from "./options";
export default {
  name: "table-group",
  props: {
    data: {
      type: Array,
      default: ()=>[]
    },
    columns: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    showElevator: {
      type: Boolean,
      default: true,
    },
    showSizer: {
      type: Boolean,
      default: false,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
    formatDate: {
      type: String,
      default: "YYYY-MM-DD HH:mm:ss",
    },
    // 后端返回信息 包含了data 和 page
    response: {
      type: Object,
      default: () => {},
    },
    // 是否展示总数 默认展示
    showTotal: {
      type: Boolean,
      default: true,
    },
    // 表格header total 默认显示文本 $1 为total 程序会将$1 替换为高亮代码
    tableHeaderTotalText: {
      type: String,
      default: function () {
        return `共有符合条件的信息$1条`;
      },
    },
    tableHeaderOptions: {
      type: Array,
      default: () => [],
    },
    isShowPage:{
      type:Boolean,
      default:true
    },
    isShowTableHeader:{
      type:Boolean,
      default:true
    }
  },
  computed: {
    /** 表格配置项 */
    tableColumn() {
      let columns = this.columns;
      columns.map((column) => {
        const { type, key, render, gatherKey } = column;
        // 时间展示 如果没有render 并且key 存在
        if (type === "date" && key && !render) {
          column.render = (h, params) => {
            return (
              <span>{dayjs(params.row[key]).format(column.formatDate || this.formatDate)}</span>
            );
          };
        }
        // 数据拆分展示
        if (type === "gather" && key && gatherKey) {
          column.render = (h, params) => {
            return (
              <span>
                {params.row[key].map((data) => data[gatherKey]).join(", ")}
              </span>
            );
          };
        }
      });
      return columns;
    },
    /** 传入page 组件里面的props */
    pageProps() {
      const page = this.response && this.response.page ? this.response.page : {};
      return {
        total: this.total || (page ? ( page.count || page.total ) : 0),
        showElevator: this.showElevator,
        pageSize: this.pageSize || page.pageSize,
        showSizer: this.showSizer,
        showTotal: this.showTotal,
        page: this.page,
      };
    },
  },
  render() {
    return (
      <div class="client-tableGroup">
        <div class="table-header">
          {this.$slots["table-header"] || ( this.isShowTableHeader && this.renderTableHeader() ) }
        </div>
        <Table
          ref="table"
          columns={this.tableColumn}
          data={ ( this.response && this.response.data ) || this.data}
          on-on-selection-change={this.handleSelectionChange}
          on-on-sort-change={this.handleSortChange}
        />
        {this.$slots["table-footer"]}
        { this.$slots["page"] || ( this.isShowPage && this.renderPage() )}
        {this.$slots["footer"]}
      </div>
    );
  },
  methods: {
    renderPage() {
      return (
        <div class="page">
          <Page
            {...{ props: this.pageProps }}
            on-on-change={this.handlePageChange}
            on-on-page-size-change={this.handlePageSizeChange}
          />
          {this.$slots["page-left"]}
        </div>
      );
    },
    renderTableHeader() {
      return (
        <div slot="table-header-content" class="table-header-content">
          { this.$slots['table-header-left'] ||  <span class="table-header-content-total"  domPropsInnerHTML={this.tableHeaderTotalText.replace( "$1", `<span class='client-highlight' style='margin:0 2px;'>${this.pageProps.total || 0}</span>` )}></span> }
          { this.$slots['table-header-right'] || <TableHeaderOptions options={this.tableHeaderOptions} response={this.response} /> }
        </div>
      );
    },
    // 筛选重置
    resetColumnFilter(columnKeys) {
      columnKeys.forEach((key) => {
        this.$refs.table && this.$refs.table.handleFilterReset(key);
      });
    },
    handlePageSizeChange(pageSize) {
      this.$emit("on-page-size-change", pageSize);
    },
    handleSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    handlePageChange(page) {
      this.$emit("on-change", page);
    },
    handleSortChange() {
      this.$emit("on-sort-change", ...arguments);
    },
  },
};
</script>
