export class SearchResult {
  constructor(
    public text: string,
    public isCurrent: boolean
  ) {}

  toString() {
    return `<mark${this.isCurrent ? ' class="current"' : ''}>${this.text}</mark>`;
  }
}
