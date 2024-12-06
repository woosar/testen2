import {
  getCategories,
  getConfig,
  getTransactions,
} from './databaseService.ts';
// import { getConfig } from './databaseService.ts';
import {
  create_entry,
  ICategoryValue,
  IEntries,
  IEntry,
  ITag,
  ITransaction,
} from '../types.ts';

const fetchTransactions = async (
  year: number,
  month: number,
  tag?: string | null
) => {
  const queryParams = {
    date: {
      $gte: new Date(Date.UTC(year, month - 1)),
      $lt: new Date(Date.UTC(year, month)),
    },
    tag: tag,
  };

  try {
    return await getTransactions(queryParams);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw new Error('Failed to fetch transactions');
  }
};

const fetchCategories = async () => {
  //todo: query
  try {
    const raw_categories = await getCategories();
    // console.log(raw_categories.categories);
    return raw_categories.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

export const sumTest = async () => {
  const asd: ITransaction[] = await fetchTransactions(2024, 12);

  // asd.map((entry) => {
  //   console.log(entry);
  // });

  return asd.map((entry) => entry.value).reduce((acc, curr) => acc + curr, 0);
  // return 1;
};

export const monthly_balance = async (
  year: number = new Date().getFullYear(),
  month: number = new Date().getMonth()
) => {
  const categories: { [key: string]: string[] } = await fetchCategories();
  // console.log('start1');
  // console.log(categories);
  // console.log('stop');

  const config = await getConfig();
  const overhead_tags = config.overhead;

  const current_month: ITag[] = [];

  for (const [category, tags] of Object.entries(categories)) {
    // console.log(tags);
    for (const tag of tags) {
      let sum: number = 0;

      const transactions = await fetchTransactions(year, month, tag);

      for (const transaction of transactions) {
        sum += transaction.value;
      }
      const potato: ITag = { name: tag, parent: category, value: sum };
      if (sum !== 0) {
        current_month.push(potato);
      }
    }
  }

  for (const tag of overhead_tags) {
    let sum: number = 0;

    const transactions = await fetchTransactions(year, month, tag);

    for (const transaction of transactions) {
      sum += transaction.value;
    }
    const potato: ITag = { name: tag, parent: 'Fixkosten', value: sum };
    // console.log(potato);
    if (sum !== 0) {
      current_month.push(potato);
    }
  }

  return current_month;
};

export const condense_monthly_balance = (monthly_balance: ITag[]) => {
  const category_evaluation: { [key: string]: number } = {};
  for (const tag of monthly_balance) {
    if (!(tag.parent in category_evaluation)) {
      category_evaluation[tag.parent] = 0;
    }
    category_evaluation[tag.parent] += tag.value;
  }

  const category_evaluation2: ICategoryValue[] = Object.entries(
    category_evaluation
  ).map(([key, value]) => ({ name: key, value: value }));

  return category_evaluation2;
};

export const create_overview = async (
  year: number,
  month: number,
  blocked: boolean,
  include_monthly_rate: boolean,
  end_of_month: boolean
): Promise<IEntry[]> => {
  const config = await getConfig();
  const monthly_evaluation_by_tag = await monthly_balance(year, month);
  const monthly_evaluation = condense_monthly_balance(
    monthly_evaluation_by_tag
  );

  // console.log(monthly_evaluation);

  const entries: IEntry[] = [];
  let necessary: number = 0;
  let counter: number = 0;
  let never_gas = true;
  for (const main_category_entry of monthly_evaluation) {
    // console.log(`alle: ${main_category_entry.name}`);
    let max_value: number | null = null;

    if (['Tanken', 'Fixkosten'].includes(main_category_entry.name)) {
      // console.log(
      //   `${main_category_entry.name}:${main_category_entry.value / 100}`
      // );
      switch (main_category_entry.name) {
        case 'Notwendige Ausgaben': {
          console.log('???');
          max_value = config.monthly_budget;
          break;
        }
        case 'Tanken': {
          max_value = config.reserved_gas;
          never_gas = false;
          break;
        }
        case 'Fixkosten': {
          max_value = config.total_expected_overhead;
          break;
        }
      }
      const rest: number | null = max_value
        ? max_value + main_category_entry.value
        : null;
      const entry = create_entry(
        main_category_entry.name,
        main_category_entry.value,
        max_value,
        rest
      );
      entries.push(entry);
    } else if (
      ['Lebensmittel', 'Notwendige Ausgaben'].includes(main_category_entry.name)
    ) {
      // console.log(
      //   `${main_category_entry.name}:${main_category_entry.value / 100}`
      // );
      counter += 1;
      necessary += main_category_entry.value;
    } else {
      // console.log(
      //   `${main_category_entry.name}:${main_category_entry.value / 100}`
      // );
      const entry = create_entry(
        main_category_entry.name,
        main_category_entry.value
      );
      entries.push(entry);
    }
  }
  if (counter > 0) {
    entries.push(
      create_entry(
        'Notwendige Ausgaben',
        necessary,
        config.monthly_budget,
        necessary + config.monthly_budget
      )
    );
  }

  if (never_gas) {
    entries.push(create_entry('Tanken', 0, 47000, 47000));
  }
  // console.log(entries);

  const expected_sum: number = await sumTest();

  const actual_sum: number = entries.reduce(
    (acc, curr) => acc + curr.current_value,
    0
  );
  // console.log(actual_sum);
  // console.log(expected_sum);
  const checksum = expected_sum - actual_sum;
  // console.log(entries);
  if (checksum !== 0) {
    throw new Error('transaction sum is not equal to category sum');
  }

  entries.push(create_entry('Aktuelles Guthaben', actual_sum));

  entries.push(create_entry('Sparziel', Math.round(100 * config.savings_goal)));

  const queryParams = {
    date: {
      $lt: new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth())),
    },
  };

  const all_transactions: ITransaction[] = await getTransactions(queryParams);
  const initial_balance = 1470 + 369372 - 174801 - 25947 + 1000000; //todo: get initial_balance from accounts!

  const current_savings: number =
    initial_balance +
    all_transactions
      .map((entry) => entry.value)
      .reduce((acc, curr) => acc + curr, 0) -
    Math.round(100 * config.savings_goal);

  // console.log(current_savings);
  let monthly_rate: number | null;
  if (current_savings < 0 && include_monthly_rate) {
    monthly_rate = Math.round(current_savings / remaining_months());
    entries.push(create_entry('Monatliche Rate', monthly_rate));
  } else {
    monthly_rate = null;
  }
  const current_balance =
    actual_sum +
    (monthly_rate ?? 0) -
    (blocked ? config.block_value : 0) -
    (end_of_month ? 0 : gather_rest_values(entries));
  entries.push(create_entry('Aktuelles Budget', current_balance));

  // console.log(monthly_rate);

  const current_savings_name: string =
    current_savings > 0 ? 'Aktuell Gespart' : 'Bis zum Sparziel';

  entries.push(create_entry(current_savings_name, Math.abs(current_savings)));
  // console.log(entries);
  return entries;
};

const gather_rest_values = (entries: IEntry[]): number => {
  const filter_list = ['Tanken', 'Fixkosten', 'Notwendige Ausgaben'];
  return entries
    .filter((entry) => filter_list.includes(entry.name))
    .reduce((acc, entry) => acc + Math.max(0, entry?.rest_value ?? 0), 0);
};

export const get_overview_interface = async (
  year: number,
  month: number,
  blocked: boolean,
  rate: boolean,
  eom: boolean
): Promise<IEntries | null> => {
  try {
    const overview = await create_overview(year, month, blocked, rate, eom);
    return {
      current_balance: overview.filter(
        (entry) => entry.name === 'Aktuelles Budget'
      )[0],
      current_budget: overview.filter(
        (entry) => entry.name === 'Aktuelles Guthaben'
      )[0],
      current_savings: overview.filter(
        (entry) =>
          entry.name === 'Aktuell Gespart' || entry.name === 'Bis zum Sparziel'
      )[0],
      gas: overview.filter((entry) => entry.name === 'Tanken')[0],
      monthly_rate: overview.filter(
        (entry) => entry.name === 'Monatliche Rate'
      )[0],
      necessary: overview.filter(
        (entry) => entry.name === 'Notwendige Ausgaben'
      )[0],
      optional: overview.filter(
        (entry) => entry.name === 'Optionale Ausgaben'
      )[0],
      overhead: overview.filter((entry) => entry.name === 'Fixkosten')[0],
      savings_goal: overview.filter((entry) => entry.name === 'Sparziel')[0],
      income: overview.filter((entry) => entry.name === 'Einnahmen')[0],
    };
  } catch (error) {
    console.error(`hon hon: ${error}`);
    return null;
  }
};

const remaining_months = () => {
  const date = new Date();
  const month = date.getMonth();

  return 12 - month;
};
