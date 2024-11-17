import {
  condense_monthly_balance,
  monthly_balance,
} from './evaluationService.ts';

const x = await monthly_balance(2024, 11);
const y = condense_monthly_balance(x);
