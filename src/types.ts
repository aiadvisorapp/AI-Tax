export interface UserPersonalizationData {
  age: number;
  filingStatus: 'Single' | 'Married Filing Jointly' | 'Married Filing Separately' | 'Head of Household';
  annualIncome: number;
  annualIncomeType: 'W2' | 'Net 1099';
  residenceCity: string;
  financialGoal: string;
  riskTolerance: 'Low' | 'Medium' | 'High';
  netWorth: number;
  investmentExperience: 'Beginner' | 'Intermediate' | 'Advanced';
  investmentPreferences: string;
  interestedInTbills: boolean;
  taxReturnYear: number;
  anyChildren: number;
  childrenAges: string;
}
