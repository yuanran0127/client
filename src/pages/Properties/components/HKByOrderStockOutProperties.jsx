import EntityProperties from "./entityProperties/EntityProperties";
import { ActionType } from "../../../api/gc/async-manager/AsyncManagerRequestBody";
import TableManagerRequest from "../../../api/table-manager/TableManagerRequest";
import HKStockOutMLotScanProperties from "./HKStockOutMLotScanProperties";
import HKByOrderStockOutMLotScanProperties from "./HKByOrderStockOutMLotScanProperties";
import HKByOrderStockOutTable from "../../../components/Table/gc/HKByOrderStockOutTable";

/**
 * 香港仓依订单出货
 */
export default class HKByOrderStockOutProperties extends EntityProperties{

    static displayName = 'HKStockOutOrderProperties';
    
    resetData = () => {
        this.setState({
          selectedRowKeys: [],
          selectedRows: [],
          tableData: [],
          loading: false,
          resetFlag: true
        });
    }

    getTableData = () => {
      const self = this;
      let requestObject = {
        tableRrn: this.state.tableRrn,
        success: function(responseBody) {
          self.setState({
            tableData: responseBody.dataList,
            table: responseBody.table,
            loading: false
          }); 
          self.form.handleSearch();
        }
      }
      TableManagerRequest.sendGetDataByRrnRequest(requestObject);
    }

    buildTable = () => {
        return <HKByOrderStockOutTable scrollY={200} 
                                      pagination={false} 
                                      ref={(orderTable) => { this.orderTable = orderTable }} 
                                      asyncType={ActionType.AsyncSoaOrder} 
                                      table={this.state.table} 
                                      data={this.state.tableData} 
                                      loading={this.state.loading} />
    }

    buildOtherComponent = () => {
        return <HKByOrderStockOutMLotScanProperties 
                                              orderTable={this.orderTable} 
                                              tableRrn={this.state.parameters.parameter1} 
                                              resetFlag={this.state.resetFlag} 
                                              onSearch={this.getTableData.bind(this)}>
                                              </HKByOrderStockOutMLotScanProperties>
    }

}