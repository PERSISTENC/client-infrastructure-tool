
<script>
import dayjs from "dayjs";
import TableHeaderOptions from './tableHeaderOptions'
export default {
  name: "table-group",
  props: {
    data: {
      type: Array,
      default:function (){
        return this.response ? this.response.data : []
      }
    },
    columns: {
      type: Array,
      default: () => []
    },
   
    showElevator: {
      type: Boolean,
      default: true
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    page: {
       type: Number,
      default: 1
    },
    formatDate: {
      type: String,
      default: "YYYY-MM-DD HH:mm:ss"
    },
    // 后端返回信息 包含了data 和 page 
    response:{
      type: Object,
      default:()=> {},
      required:true
    },
    // 是否展示总数 默认展示
    showTotal:{
      type: Boolean,
      default:true,
    },
    // 表格header total 默认显示文本 $1 为total 程序会将$1 替换为高亮代码
    tableHeaderTotalText:{
      type:String,
      default: function () {
        return `共有符合条件的信息$1条`
      }
    },
    tableHeaderOptions:{
      type:Array,
      default:()=>[]
    }
  },
  computed: {
    tableColumn() {
      let columns = this.columns;
      columns.map(column => {
        const { type, key, render,gatherKey } = column;
        // 时间展示 如果没有render 并且key 存在
        if (type === "date" && key && !render) {
          column.render = (h, params) => {
            return (
              <span>{dayjs(params.row[key]).format(this.formatDate)}</span>
            );
          };
        }
        if (type === 'gather' && key && gatherKey){
            column.render = (h, params) => {
              console.log(params.row,key)
              console.log(params.row[key])
              
              return (
                <span>{params.row[key].map(data=>data[gatherKey]).join(', ')}</span>
              );
            };
        }
      });
      return columns;
    },
    pageProps(){
      const page = this.response.page ? this.response.page : {}
      return {
          total: page ? page.count : 0 ,
          showElevator: this.showElevator,
          pageSize: this.pageSize ||  page.pageSize,
          showSizer: this.showSizer,
          showTotal: this.showTotal,
          page: this.page
        };
    },
    
  },
  render() {
    // this.data
    return (
      <div class="tableGroup">
        <div class="table-header" >
            {this.$slots["table-header"] || this.renderTableHeader()}
        </div>
        <Table
          ref="table"
          columns={this.tableColumn}
          data={this.response.data}
          on-on-selection-change={this.handleSelectionChange}
          on-on-sort-change={this.handleSortChange}
        />
        {this.$slots["table-footer"]}
        {this.$slots["page"] || this.renderPage()}
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
    renderTableHeader(){                 
        return (
            <div slot="table-header-content" class="table-header-content">
                <span class="table-header-content-total" domPropsInnerHTML={this.tableHeaderTotalText.replace('$1',`<span class='client-highlight' style='margin:0 2px;'>${this.pageProps.total}</span>`)}></span>
                <TableHeaderOptions contentTopRight={this.tableHeaderOptions} response={this.response}/>
            </div>
        )
    },
    // 筛选重置
    resetColumnFilter(columnKeys){
      columnKeys.forEach((key)=>{
          this.$refs.table && this.$refs.table.handleFilterReset(key)
      })
      
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
    }
  }
};
</script>
<style lang="less" scoped>
.tableGroup {
  background-color: #ffffff;
  .table-header{
      padding: 12px 0 12px 0;
      &-content{
        display:flex;
        align-items: center;
        justify-content: space-between;
        &-total{
            font-size: 14px;
            font-family: MicrosoftYaHeiUI;
            text-align: left;
            color: #999999;
            line-height: 18px;
            cursor: pointer;
        }

      }
  }
  .page {
    width: 100%;
    margin: 24px 0;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
}
</style>