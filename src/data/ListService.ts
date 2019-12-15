export interface ListItem {
  id: number;
  title: string;
  items: string[];
  description: string;
}

export abstract class ListService {
  private static list = [
    {
      id: 1,
      title: 'Lista de la compra',
      items: ['Aguacates', 'papuchis', 'mermelada'],
      description: 'Description de la Lista de la compra',
    },
    {
      id: 2,
      title: 'Lista de tareas',
      items: ['Sacar al perro', 'trabajo', 'etc'],
      description: 'Descripcion de la lista de tareas',
    },
  ];

  public static getItems(): Promise<ListItem[]> {
    return Promise.resolve(this.list);
  }

	public static getItem(id: number): Promise<ListItem | undefined> {
		return Promise.resolve(this.list.find((item) => item.id === id));
	}

	public static updateNoteItems(id: number, items: string[]) {
		const index  = this.list.findIndex((item) => item.id === id)
		if (index !== -1 ){
			this.list[index].items = items;
		}
	}
}

export default ListService;
