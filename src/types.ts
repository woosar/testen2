export interface ITag {
  name: string;
  parent: string;
  value: number;
}

export interface ICategoryValue {
  name: string;
  value: number;
}

export interface ITransaction {
  _id: string;
  value: number;
  date: Date;
  tag: string;
  comment: string;
  account: string;
  purchase: string;
}

export interface IConfig extends Document {
  _id: string;
  reserved_gas: number;
  monthly_budget: number;
  income: string[];
  overhead: string[];
  total_expected_income: number;
  total_expected_overhead: number;
  savings_goal: number;
  date: Date;
  block_value: number;
}

export interface IEntry {
  name: string;
  current_value: number;
  max_value?: number | null;
  rest_value?: number | null;
}

export interface IEntries {
  income: IEntry;
  overhead: IEntry;
  necessary: IEntry;
  optional: IEntry;
  gas: IEntry;
  current_budget: IEntry;
  current_balance: IEntry;
  current_savings: IEntry;
  savings_goal: IEntry;
  monthly_rate?: IEntry | null;
}

export const create_entry = (
  name: string,
  current_value: number,
  max_value: number | null = null,
  rest_value: number | null = null
): IEntry => {
  return { name, current_value, max_value, rest_value };
};
