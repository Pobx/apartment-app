export interface BillItemDTO {
  description: string;
  units: string;
  amount: number;
}

export interface InvoiceDTO {
  roomName: string;
  renterName: string;
  billingMonth: string;
  issueDate: string;
  items: BillItemDTO[];
  grandTotal: number;
  promptPayNumber: string;
}
