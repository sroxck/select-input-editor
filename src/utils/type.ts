

export interface BlockEvent extends Event {
  target: HTMLElement & {
    removeAttribute(attributeName: string): void;
  };
  data:string
  code:string
}
