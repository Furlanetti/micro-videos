import Entity from "@seedwork/domain/entity/entity";
import { InMemorySearchableRepository } from "../in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ["name"];
  protected async applyFilter(
    items: StubEntity[],
    filter: string
  ): Promise<StubEntity[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.price.toString() === filter
      );
    });
  }
}

describe("InMemorySearchableRepository Unit test", () => {
  let repository: StubInMemorySearchableRepository;

  beforeEach(() => {
    repository = new StubInMemorySearchableRepository();
  });

  describe("applyFilter", () => {
    it("should no filte ritems when filter param is null", async () => {
      const items = [new StubEntity({ name: "name value", price: 5 })];

      const filteredItems = await repository["applyFilter"](items, null);
      expect(filteredItems).toStrictEqual(items);
    });

    it("should filter using a filter param", async () => {
      const items = [
        new StubEntity({ name: "test", price: 5 }),
        new StubEntity({ name: "TEST", price: 5 }),
        new StubEntity({ name: "fake", price: 0 }),
      ];

      let filteredItems = await repository["applyFilter"](items, "TEST");
      expect(filteredItems).toStrictEqual([items[0], items[1]]);

      filteredItems = await repository["applyFilter"](items, "5");
      expect(filteredItems).toStrictEqual([items[0], items[1]]);

      filteredItems = await repository["applyFilter"](items, "no-filter");
      expect(filteredItems).toHaveLength(0);
    });
  });

  describe("applySort", () => {

  });

  describe("applyPaginate", () => {});

  describe("search", () => {});
});
