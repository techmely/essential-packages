/* eslint-disable no-param-reassign */

import {
  Cell,
  Column,
  ImageHyperlinkValue,
  ImagePosition,
  ImageRange,
  Workbook,
  Worksheet,
} from 'exceljs';
import { downloadByData } from '../files/download';
import { formatDate } from './dayjs';

export type ExcelColumnName =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O';

export const excelColumnMap = new Map<number, ExcelColumnName>([
  [1, 'A'],
  [2, 'B'],
  [3, 'C'],
  [4, 'D'],
  [5, 'E'],
  [6, 'F'],
  [7, 'G'],
  [8, 'H'],
  [9, 'I'],
  [10, 'J'],
  [11, 'K'],
  [12, 'L'],
  [13, 'M'],
  [14, 'N'],
  [15, 'O'],
]);

export const rowHeaderHeight = 27.75;
export const rowDataHeight = 26.25;
export const rowFontSize = 13;
export const columnNumFormat = '#,##0';
export const columnPercentFormat = '0.00%';

export type ExcelColumn<T> = Partial<Column> & { key: keyof T & string };

export function createTableWorkbook<T>(
  data: T[],
  columns: Partial<Column>[],
  worksheetName: string,
) {
  const workbook = new Workbook();
  workbook.created = new Date();
  workbook.modified = new Date();

  workbook.addWorksheet(worksheetName);
  const worksheet = workbook.getWorksheet(worksheetName);

  worksheet.columns = columns;

  worksheet.addRows(data);
  worksheet.properties.defaultRowHeight = 15;

  return workbook;
}

export function exportWorkbook(workbook: Workbook, name: string) {
  workbook.xlsx
    .writeBuffer()
    .then(blob => {
      downloadByData(blob, name);
    })
    .catch(error => console.log(error));
}

export type ExcelAddImageOption =
  | string
  | ({ editAs?: string } & ImageRange & { hyperlinks?: ImageHyperlinkValue })
  | ({ editAs?: string } & ImagePosition & { hyperlinks?: ImageHyperlinkValue });

const defaultAddingImageOptions = {
  tl: { col: 1.5, row: 1.5 },
  br: { col: 3.5, row: 5.5 },
  editAs: 'oneCell',
} as ExcelAddImageOption;

export async function addImageToWorksheet(
  image: string,
  workbook: Workbook,
  worksheet: Worksheet,
  addImageOptions = defaultAddingImageOptions,
) {
  const res = await fetch(image);
  const imgBuffer = await res.arrayBuffer();

  const imageWorkbook = workbook.addImage({
    buffer: imgBuffer,
    extension: 'png',
  });

  worksheet.addImage(imageWorkbook, addImageOptions);
}

export const baseExcelColumnsName: ExcelColumnName[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function beatifyHeaderCell(cell: Cell) {
  const whiteColor = 'ffffff';
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'b54141' } };
  cell.font = { bold: true, size: rowFontSize, color: { argb: whiteColor }, name: 'Calibri' };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
}

export function drawBorderCell(cell: Cell, color = '000000') {
  cell.border = {
    top: { style: 'thin', color: { argb: color } },
    left: { style: 'thin', color: { argb: color } },
    bottom: { style: 'thin', color: { argb: color } },
    right: { style: 'thin', color: { argb: color } },
  };
}

export function beautifyExcelTable(
  worksheet: Worksheet,
  startIndexHeaderTable: number,
  endIndexTable: number,
  columns = baseExcelColumnsName,
) {
  const rowHeader = worksheet.getRow(startIndexHeaderTable);
  rowHeader.height = rowHeaderHeight;

  worksheet.getRows(startIndexHeaderTable + 1, endIndexTable)?.forEach(row => {
    row.height = rowDataHeight;
    row.font = { size: rowFontSize };
  });

  columns.forEach(column => {
    const cell = worksheet.getCell(`${column}${startIndexHeaderTable}`);
    beatifyHeaderCell(cell);

    for (let index = startIndexHeaderTable; index < endIndexTable + 1; index++) {
      const matrixCell = worksheet.getCell(`${column}${index}`);
      drawBorderCell(matrixCell);
    }
  });
}

type InsertDateOptions = {
  endIndexTable: number;
  startMergeColumn: ExcelColumnName;
  endMergeColumn: ExcelColumnName;
};

export function insertDateExport(worksheet: Worksheet, options: InsertDateOptions) {
  const startIndexMergeCell = `${options.startMergeColumn}${options.endIndexTable + 2}`;
  const endIndexMergeCell = `${options.endMergeColumn}${options.endIndexTable + 2}`;

  worksheet.mergeCells(`${startIndexMergeCell}:${endIndexMergeCell}`);
  const now = formatDate(new Date());
  const dateFragments = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(now);

  if (dateFragments !== null) {
    const [, day, month, year] = dateFragments;
    const cellDateExport = worksheet.getCell(`${startIndexMergeCell}`);
    cellDateExport.value = `Ngày ${day} tháng ${month} năm ${year}`;
    cellDateExport.font = { italic: true, size: rowFontSize };
    cellDateExport.alignment = { horizontal: 'center', vertical: 'middle' };
  }
}

export function insertSumValueColumn(
  worksheet: Worksheet,
  columnName: string,
  startIndex: number,
  endIndex: number,
  result: number,
) {
  // @ts-expect-error Ignore type check
  worksheet.getCell(`${columnName}${endIndex}`).value = {
    formula: `SUM(${columnName}${startIndex}:${columnName}${endIndex - 1})`,
    result,
  };
}
