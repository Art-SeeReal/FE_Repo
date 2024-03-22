import { IData } from "../hooks/useFormState";

export interface RecruitsTypes {
  id: number;
  name: string;
  title: string;
  location: {
    code: string;
    label: string;
  }
  field: string;
  RegDate: string;
  content: string;
}

export interface RecruitsResponseTypes {
  data: {
    results: RecruitsTypes[];
  };
}

export interface RecruitsPostTypes {
  title: string;
  content: string;
}

export interface RecruitsUpdataTypes {
    id: number;
    data: IData<string>;
  }