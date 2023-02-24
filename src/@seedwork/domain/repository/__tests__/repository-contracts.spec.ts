import { SearchParams, SearchResult } from "../repository-contracts";

describe("Search Unit tests", () => {
  describe("SearchParams Unit Test", () => {
    it("page prop", () => {
      const arrange = [
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: "", expected: 1 },
        { page: "fake", expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: true, expected: 1 },
        { page: false, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ];

      arrange.forEach((item) => {
        expect(new SearchParams({ page: item.page as any }).page).toBe(
          item.expected
        );
      });
    });

    it("per page prop", () => {
      const arrange = [
        { per_page: null, expected: 15 },
        { per_page: undefined, expected: 15 },
        { per_page: "", expected: 15 },
        { per_page: "fake", expected: 15 },
        { per_page: 0, expected: 15 },
        { per_page: -1, expected: 15 },
        { per_page: true, expected: 15 },
        { per_page: false, expected: 15 },
        { per_page: {}, expected: 15 },
        { per_page: 1, expected: 1 },
        { per_page: 2, expected: 2 },
        { per_page: 10, expected: 10 },
      ];

      arrange.forEach((item) => {
        expect(
          new SearchParams({ per_page: item.per_page as any }).per_page
        ).toBe(item.expected);
      });
    });

    it("sort prop", () => {
      const arrange = [
        { sort: null, expected: null },
        { sort: undefined, expected: null },
        { sort: "", expected: null },
        { sort: "field", expected: "field" },
        { sort: 0, expected: "0" },
        { sort: -1, expected: "-1" },
        { sort: true, expected: "true" },
        { sort: false, expected: "false" },
        { sort: {}, expected: "[object Object]" },
        { sort: 1, expected: "1" },
        { sort: 2, expected: "2" },
        { sort: 10, expected: "10" },
      ];

      arrange.forEach((item) => {
        expect(new SearchParams({ sort: item.sort as any }).sort).toBe(
          item.expected
        );
      });
    });

    it("sort_dir prop", () => {
      let params = new SearchParams();
      expect(params.sort_dir).toBeNull();

      params = new SearchParams({ sort: null });
      expect(params.sort_dir).toBeNull();

      params = new SearchParams({ sort: undefined });
      expect(params.sort_dir).toBeNull();

      params = new SearchParams({ sort: "" });
      expect(params.sort_dir).toBeNull();

      const arrange = [
        { sort_dir: null, expected: "asc" },
        { sort_dir: undefined, expected: "asc" },
        { sort_dir: "", expected: "asc" },
        { sort_dir: "fake", expected: "asc" },
        { sort_dir: 0, expected: "asc" },
        { sort_dir: "asc", expected: "asc" },
        { sort_dir: "ASC", expected: "asc" },
        { sort_dir: "desc", expected: "desc" },
        { sort_dir: "DESC", expected: "desc" },
      ];

      arrange.forEach((item) => {
        expect(
          new SearchParams({ sort: "field", sort_dir: item.sort_dir as any })
            .sort_dir
        ).toBe(item.expected);
      });
    });

    it("filter prop", () => {
      const params = new SearchParams();
      expect(params.filter).toBeNull();

      const arrange = [
        { filter: null, expected: null },
        { filter: undefined, expected: null },
        { filter: "", expected: null },
        { filter: "fake", expected: "fake" },
        { filter: 0, expected: "0" },
        { filter: -1, expected: "-1" },
        { filter: true, expected: "true" },
        { filter: false, expected: "false" },
        { filter: {}, expected: "[object Object]" },
        { filter: 1, expected: "1" },
        { filter: 2, expected: "2" },
        { filter: 10, expected: "10" },
      ];

      arrange.forEach((item) => {
        expect(new SearchParams({ filter: item.filter as any }).filter).toBe(
          item.expected
        );
      });
    });
  });

  describe("SearchResult Unit Tests", () => {
    test("constructor props", () => {
      let result = new SearchResult({
        items: ["entity1", "entity2"] as any,
        total: 4,
        current_page: 1,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: null,
      });

      expect(result.toJSON()).toStrictEqual({
        items: ["entity1", "entity2"],
        total: 4,
        current_page: 1,
        last_page: 2,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: null,
      });

      result = new SearchResult({
        items: ["entity1", "entity2"] as any,
        total: 4,
        current_page: 1,
        per_page: 2,
        sort: "name",
        sort_dir: "asc",
        filter: "test",
      });

      expect(result.toJSON()).toStrictEqual({
        items: ["entity1", "entity2"],
        total: 4,
        current_page: 1,
        last_page: 2,
        per_page: 2,
        sort: "name",
        sort_dir: "asc",
        filter: "test",
      });
    });

    test("last_page when total is not a multiple of per_page", () => {
      const result = new SearchResult({
        items: [] as any,
        total: 101,
        current_page: 1,
        per_page: 20,
        sort: "name",
        sort_dir: "asc",
        filter: "test",
      });

      expect(result.toJSON()).toStrictEqual({
        items: [],
        total: 101,
        current_page: 1,
        last_page: 6,
        per_page: 20,
        sort: "name",
        sort_dir: "asc",
        filter: "test",
      });
    });

    it("should set last page 1 when per page field is greater than total field", () => {
      const result = new SearchResult({
        items: [] as any,
        total: 4,
        current_page: 1,
        per_page: 15,
        sort: "name",
        sort_dir: "asc",
        filter: "test",
      });

      expect(result.toJSON()).toStrictEqual({
        items: [],
        total: 4,
        current_page: 1,
        last_page: 1,
        per_page: 15,
        sort: "name",
        sort_dir: "asc",
        filter: "test",
      });
    });
  });
});
