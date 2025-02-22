export interface MenuItem {
  id: string
  name: string
  children?: MenuItem[]
  isExpanded?: boolean
  slug?: string
}

export type ResponseData = {
  data: any;
  status: number;
};