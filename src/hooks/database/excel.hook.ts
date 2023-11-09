import {useCallback} from "react";
import * as FileSaver from "file-saver"
import XLSX from "xlsx"

export const useExcel = () => {

   const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
   const fileName = "data.xlsx"

   const exportToExcel = useCallback(async (excelData) => {
      const ws = XLSX.utils.json_to_sheet(excelData)
      const wb = {Sheets: {'data':ws}, SheetNames: ['data']}
      const excelBuffer = XLSX.write(wb, {bookType:"xlsx", type:"array"})
      const data = new Blob([excelBuffer], {type: fileType})
      FileSaver.saveAs(data, fileName)
   }, [])

   return {exportToExcel}
}