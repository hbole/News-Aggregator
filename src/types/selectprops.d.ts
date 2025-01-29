type SelectProps<T> = {
  label: string;
  data: T[];
  value: string;
  dataKey: keyof T;
  dataValue: keyof T;
  dataLabel: keyof T;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}