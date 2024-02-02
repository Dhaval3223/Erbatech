export interface IReportsSlice {
  isGetReportLoading: boolean;
  reportsData: any;
  isGetReportErr: boolean;
  reportDataErrMsg: string;
  isDownloadCSVLoading: boolean;
  isDownloadCSVSuccess: boolean;
  isDownloadCSVError: boolean;
  downloadCSVData: any;
  downloadCSVMsg: string;
  csvData: any;
  isGenerateCsvLoading: any;
  isGenerateCsvSuccess: any;
  isGenerateCsvError: any;
  generateCsvmsg: any;
};