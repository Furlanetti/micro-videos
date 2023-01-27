import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found-error";
import InMemoryRepository from "./in-memory.repository";

type StubEntityProps = { name: string; price: number };
class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Test", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  describe("insert", () => {
    it("should inserts a new entity", async () => {
      const entity = new StubEntity({ name: "name value", price: 5 });

      await repository.insert(entity);

      expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });
  });

  describe("findById", () => {
    it("should throw error when entity not found", async () => {
      expect(repository.findById("fakeid")).rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID fakeid`)
      );

      expect(
        repository.findById("00628d92-bd18-4fab-916b-2d997f8d9e1d")
      ).rejects.toThrow(
        new NotFoundError(
          `Entity Not Found using ID 00628d92-bd18-4fab-916b-2d997f8d9e1d`
        )
      );
    });

    it("should find a entity by id", async () => {
      const entity = new StubEntity({ name: "name value", price: 5 });
      await repository.insert(entity);

      let entityFound = await repository.findById(entity.id);
      expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

      entityFound = await repository.findById(entity.uniqueEntityId);
      expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
  });

  describe("findAll", () => {
    it("should returns all entities", async () => {
      const entity = new StubEntity({ name: "name value", price: 5 });
      await repository.insert(entity);

      const entities = await repository.findAll();
      expect(entities).toStrictEqual([entity]);
    });
  });

  describe("update", () => {
    it("should throw error on update when entity not found", async () => {
      const entity = new StubEntity({ name: "name value", price: 5 });

      expect(repository.update(entity)).rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID ${entity.id}`)
      );
    });

    it("should updates an entity", async () => {
      const entity = new StubEntity({ name: "name value", price: 5 });
      await repository.insert(entity);

      const entityUpdated = new StubEntity(
        { name: "updated", price: 1 },
        entity.uniqueEntityId
      );

      await repository.update(entityUpdated);
      expect(entityUpdated.toJSON()).toStrictEqual(
        repository.items[0].toJSON()
      );
    });
  });

  describe("delete", () => {
    it("should throw error when entity not found", async () => {
      expect(repository.delete("fakeid")).rejects.toThrow(
        new NotFoundError(`Entity Not Found using ID fakeid`)
      );

      expect(
        repository.delete("00628d92-bd18-4fab-916b-2d997f8d9e1d")
      ).rejects.toThrow(
        new NotFoundError(
          `Entity Not Found using ID 00628d92-bd18-4fab-916b-2d997f8d9e1d`
        )
      );
    });

    it("should deletes an entity", async () => {
      const entity = new StubEntity({ name: "name value", price: 5 });
      await repository.insert(entity);

      await repository.delete(entity.id);
      expect(repository.items).toHaveLength(0);

      await repository.insert(entity);

      await repository.delete(entity.uniqueEntityId);
      expect(repository.items).toHaveLength(0);
    });
  });
});
