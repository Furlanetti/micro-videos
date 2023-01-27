import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: Filter;
};

export class SearchParams {
  protected _page: number;
  protected _per_page = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }
  get per_page() {
    return this._per_page;
  }

  set per_page(value: number) {}
  get sort() {
    return this._sort;
  }

  set sort(value: string | null) {}

  set sort_dir(value: SortDirection | null) {}
  get sort_dir() {
    return this._sort_dir;
  }

  set filter(value: Filter | null) {}
  get filter() {
    return this._filter;
  }

  get page() {
    return this._page;
  }

  set page(value: number) {}
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
