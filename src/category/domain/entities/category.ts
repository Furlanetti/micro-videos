import UniqueEntityId from "@seedwork/domain/value-objects/unique-entity-id.vo";
import Entity from "@seedwork/domain/entity/entity";

export interface Properties {
  name: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
}

export default class Category extends Entity<Properties> {
  constructor(public readonly props: Properties, id?: UniqueEntityId) {
    if (!props.name) {
      throw new Error("Name is required");
    }
    if (props.name.length > 255) {
      throw new Error("Name must be less than 255 chars");
    }
    super(props, id);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  update(name: string, description: string) {
    this.props.name = name;
    this.props.description = description;
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }
}
