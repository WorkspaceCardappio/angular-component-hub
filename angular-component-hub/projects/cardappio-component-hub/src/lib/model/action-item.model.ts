
export interface ActionItem {
  name: string,
  icon: { name: string, color: string },
  action: (id?: number) => void,
  enabled: boolean
}
